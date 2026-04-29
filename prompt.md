# Product Decision Document: Persona-Based AI Chatbot

## Executive Summary
Build a single-user, persona-based AI chatbot that enables dynamic personality switching. Users interact with domain experts (each with distinct communication styles), receiving tailored guidance based on the selected persona. This MVP prioritizes rapid iteration, user experience clarity, and deployment speed over persistence and scale.

---

## 1. Persona Multiplicity — Why Multiple Experts?

### Decision
Implement 3+ switchable personas rather than a single monolithic chatbot.

### Rationale
- **User Choice**: Different learning styles benefit from different teaching approaches. A student might prefer Kshitij's methodical instruction today but Anshuman's strategic mentoring tomorrow.
- **Content Differentiation**: Reduces need for complex prompt engineering. Each persona has explicit written guidelines, not blended logic.
- **Engagement**: Novelty of switching personas increases session duration and app revisits.
- **Testing**: Easier to A/B test responses against baseline behavior per persona.

### Tradeoffs
- **Cons**: Increased data maintenance (3x prompt definitions instead of 1)
- **Decision**: Tradeoff acceptable for MVP. Personalization > single-expert

### Implementation
- Personas stored as JavaScript objects (not database) for fast iteration
- Each persona includes: id, name, subtitle, suggestions, system_prompt
- Frontend UI presents clear persona buttons; backend switches prompt strategy

---

## 2. React + Vite Frontend — Why This Stack?

### Decision
Choose React 19 with Vite over alternatives (Vue, Svelte, vanilla JS).

### Rationale
- **React Ecosystem**: Largest community, easiest hiring pool, maximum libraries/integrations available
- **Vite Build Speed**: Sub-second HMR vs Webpack's seconds. Critical for UX during development
- **Component Reusability**: Props-based composition naturally maps to modular UI (MessageBubble, TypingIndicator, etc.)
- **Mental Model**: Functional components + hooks align with product team's React expertise

### Tradeoffs Considered
| Alternative | Why Rejected |
|-------------|-------------|
| Vue | Smaller community; fewer UI kit integrations |
| Svelte | Smaller team expertise; limited component libraries |
| Vanilla JS + Webpack | Manual state management; slow rebuild times; no dev ergonomics |
| Next.js | Overkill for client-side-only app; SSR not needed |

### Decision: Stick with React + Vite

---

## 3. Tailwind CSS — Why Not Plain CSS/SCSS?

### Decision
Use Tailwind CSS 4 for all styling over CSS modules or Sass.

### Rationale
- **Consistency**: Pre-defined color/spacing system enforces visual coherence without designer hand-holding
- **Speed**: Utility-first approach faster than writing custom CSS for every component
- **Mobile-First**: Responsive breakpoints (sm:, lg:) built in; no media query verbosity
- **Dark Mode Ready**: Tailwind tokens (e.g., `dark:bg-slate-900`) enable light/dark mode without extra work
- **Low Bundle Cost**: 4KB gzipped after optimizations; comparable to small CSS file

### Tradeoffs
- **Cons**: Markup gets verbose with class names; noise in component files
- **Decision**: Acceptable tradeoff. DX improvement + consistent design > minimal markup noise

### Why Not CSS-in-JS (Styled Components)?
- Runtime overhead; larger bundle
- Overkill for static styling needs

---

## 4. Component Decomposition — Why Split UI This Way?

### Decision
Separate UI into: `ChatWindow` (container), `MessageBubble`, `PersonaSwitcher`, `SuggestionChips`, `TypingIndicator` (presentational).

### Rationale
1. **Single Responsibility**: Each component does one thing well
   - `MessageBubble` = format a single message
   - `TypingIndicator` = animated waiting state
   - `PersonaSwitcher` = persona selection controls
   
2. **Testability**: Isolated components can be unit tested independently
   
3. **Reusability**: `MessageBubble` used in main chat + potential export features
   
4. **State Management Clarity**: Parent (`ChatWindow`) owns state; children receive props. Unidirectional data flow.

### Alternative Considered
- Monolithic ChatApp component
- **Why Rejected**: Harder to test, harder to reuse, mental overhead to modify

---

## 5. Fetch API over Axios — Why Native?

### Decision
Use native Fetch API instead of axios for HTTP requests.

### Rationale
- **Zero Dependencies**: Reduces package.json bloat; fewer security vulnerabilities to track
- **Modern Standard**: Fetch is browser standard (IE11+ support via polyfill if needed)
- **Sufficient Feature Set**: POST with JSON body is all we need; no complex interceptor chains required
- **Smaller Bundle**: 2-3KB saved by avoiding axios

### Tradeoff
- **Cons**: Slightly more boilerplate (response.json()) vs axios (data property)
- **Decision**: Tradeoff justified for dependency reduction

---

## 6. Backend: Express.js + OpenAI — Why This Architecture?

### Decision
Build lightweight Express server to proxy chat requests to OpenAI API.

### Rationale
- **Backend Isolation**: Frontend never calls OpenAI directly
  - Security: API key stays server-side
  - Flexibility: Easy to swap LLM later (Anthropic, Hugging Face, custom model)
  - Rate Limiting: Backend can enforce per-user limits
  
- **Express Choice**: Minimal, well-understood framework
  - No over-engineering (no Nest.js for MVP)
  - Rapid endpoint creation
  - Wide middleware ecosystem

- **Persona Routing**: Backend constructs system prompt based on persona parameter
  - Centralized prompt management
  - Easy to test prompt effectiveness per persona

### Tradeoffs
| Option | Why Rejected |
|--------|-------------|
| Call OpenAI directly from frontend | Security risk (API key exposed); no rate limiting; harder future migrations |
| FastAPI (Python) | Adds deployment complexity; team has Node expertise |
| Next.js API Routes | Overkill for this simple proxy; coupling frontend build to backend |

---

## 7. No Database (In-Memory) — Why Not Persist Conversations?

### Decision
Store message history in React state only (lost on page refresh).

### Rationale
- **MVP Scope**: Database adds 3 days of work (schema design, migrations, ORM setup)
- **User Expectation**: First-time users expect fresh start, not previous conversations
- **Deployment Simplicity**: No DB credentials, no managed database service needed
- **Cost**: Zero database fees for MVP testing

### Future Migration Path
- Add localStorage first (1 hour): Works offline, survives refresh
- Add Firebase/Supabase next (4 hours): Cloud-backed, multi-device sync
- Add PostgreSQL eventually: For scale and analytics

### Decision: Acceptable for Alpha

---

## 8. Suggestion Chips — Why Quick Replies?

### Decision
Include persona-specific suggestion buttons to prompt user input.

### Rationale
- **Friction Reduction**: New users often stuck on "what to ask". Suggestions unblock them
- **Persona Reinforcement**: Suggestions reflect each persona's expertise area
  - Kshitij suggests DSA/interview questions
  - Anshuman suggests career strategy questions
- **Higher Engagement**: One-click reply > type full question
- **Faster Testing**: Pre-defined suggestions help validate persona responses

### Tradeoff
- **Cons**: Limits user creativity; feels restrictive if suggestions too narrow
- **Mitigation**: Always show open-text input; suggestions are helpers, not constraints

---

## 9. Typing Indicator — Why Show "Bot is Typing"?

### Decision
Display animated dots while awaiting OpenAI response.

### Rationale
- **UX Polish**: Signals system hasn't frozen; builds trust
- **Response Expectation Setting**: User knows response coming (5-10 sec typical)
- **Visual Feedback Loop**: Reduces impression of lag or failure

### Technical Implementation
- CSS animation (3 pulsing dots) with staggered delays
- GPU-accelerated; <1ms per frame overhead
- Removes immediately when response arrives

---

## 10. Single-User, No Auth — Why Not Multi-User Yet?

### Decision
Scope MVP to single-user session with no login required.

### Rationale
- **Time to Market**: Auth adds 2+ days (JWT, refresh tokens, user DB, password reset flow)
- **MVP Validation**: Single-user is enough to test core hypothesis: "Do users prefer personalized chatbots?"
- **Deployment Simplicity**: No user management infrastructure
- **Privacy**: No user data to protect initially

### Path to Multi-User
1. Add localStorage user ID (client-side session)
2. Add Firebase Authentication (5 hours, solves auth + user database)
3. Sync message history to Firestore (2 hours)

---

## 11. Synchronous Message Flow (Not Streaming) — Why Not Real-Time Streaming?

### Decision
Load entire response at once, not stream tokens in real-time.

### Rationale
- **Development Speed**: Simplifies frontend (no Server-Sent Events or WebSocket logic)
- **Browser Support**: Works in all browsers (streaming requires Connection header support)
- **Backend Simplicity**: Express responds with JSON; no chunked encoding setup needed
- **Sufficient UX**: 5-10 second wait with typing indicator is acceptable for MVP

### Why Streaming Matters (Future)
- Perceived latency lower
- Can start reading response while it's being generated
- Shows "thinking" tokens if using extended thinking models

### Decision: Defer to V2 after user validation

---

## 12. Tailwind Responsive Design — Why Mobile-First?

### Decision
Design with Tailwind's mobile-first breakpoints: `sm:`, `md:`, `lg:` classes.

### Rationale
- **Mobile Growth**: 60%+ traffic on mobile/tablet for education products
- **Progressive Enhancement**: Start minimal on mobile, add complexity on desktop
- **Tailwind Native**: Breakpoint system built in; no extra media query layers

### Implementation Examples
```jsx
className="text-sm sm:text-base md:text-lg"  // Scales text font size by viewport
className="px-4 sm:px-6"                      // Reduces padding on mobile
className="max-w-[85%] sm:max-w-[75%]"        // Bubble width adjusts
```

---

## Success Criteria — Why These Metrics?

### Decision
Validate via:
1. ✅ User can switch between 3+ personas
2. ✅ Messages sent successfully to backend
3. ✅ Persona-specific responses displayed
4. ✅ Suggestion chips trigger message sending
5. ✅ No console errors or unhandled rejections
6. ✅ Responsive on mobile/tablet/desktop
7. ✅ Typing indicator displays while awaiting response

### Rationale
- **Technical**: Criteria 1-2 prove architecture works
- **UX**: Criteria 3-4 prove personas actually change behavior
- **Quality**: Criteria 5-6 prove production-ready code
- **Polish**: Criteria 7 proves perceived performance

---

## Constraints — Why These Limitations?

| Constraint | Reason |
|-----------|--------|
| No database | MVP speed; validate hypothesis first |
| No authentication | Simplify deployment; single-user testing sufficient |
| Single session | Reduced complexity; multi-user tracked for V2 |
| In-memory state | Fast iteration; localStorage upgrade path exists |
| Synchronous responses | Simpler frontend logic; streaming upgrade path exists |

---

## Risk Mitigation

### Risk: Frontend crashes on large message history
**Mitigation**: Virtual scrolling if 50+ messages detected (future feature)

### Risk: OpenAI API rate limits or cost overruns
**Mitigation**: Backend enforces strict rate limit (10 req/min); alert on cost threshold

### Risk: Persona prompts drift in quality
**Mitigation**: Log prompt + response pairs for auditing; easy to version prompts in code

### Risk: Users switch personas mid-conversation
**Mitigation**: Clear messages when persona changed; offer "start over" button vs. continuing

---

## Next Steps After MVP Validation

1. **User Testing** (Week 1): 10 target users test app; collect feedback
2. **Persistence** (Week 2): Add Firebase if retention data shows value
3. **Auth** (Week 2-3): Add login only if multi-device access demanded
4. **Streaming** (Week 3): Implement token streaming if latency feedback critical
5. **Analytics** (Week 4): Track persona popularity, response satisfaction, churn

---

## Conclusion

This architecture prioritizes **speed and simplicity** over completeness. Every technology choice—React, Vite, Tailwind, Express, Fetch, in-memory state—removes friction for MVP launch. Constraints (no DB, no auth, single-user) are deliberate, not accidental; they enable validation within 1-2 weeks. All decisions include upgrade paths so nothing is locked in; we're optimized for learning, not premature scale.
