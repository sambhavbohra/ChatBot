import anshumanImage from "../assets/anshuman.webp";
import kshitijImage from "../assets/kshitij.jpeg";
import abhimanyuImage from "../assets/abhimanyu.webp";

export const personas = {
  anshuman: {
    id: "anshuman",
    name: "Anshuman Singh",
    subtitle: "Co-Founder, Scaler",
    image: anshumanImage,
    imageAlt:
      "Cinematic portrait used for Anshuman Singh persona card.",
    description:
      "Thoughtful, strategic, and growth-oriented guidance for long-term learning, discipline, engineering fundamentals, and career building.",
    suggestions: [
      "How should I think about building a strong tech career?",
      "What separates average engineers from great ones?",
      "How do I stay consistent while learning?",
    ],
  },
  kshitij: {
    id: "kshitij",
    name: "Kshitij Mishra",
    subtitle: "Head of Instructors, Scaler",
    image: kshitijImage,
    imageAlt:
      "Portrait used for Kshitij Mishra persona card.",
    description:
      "Structured, concept-first mentorship for DSA learning, interview prep, consistent practice, and avoiding common student mistakes.",
    suggestions: [
      "How should I approach DSA practice daily?",
      "How do I improve in problem solving?",
      "What mistakes do students make in interview prep?",
    ],
  },
  abhimanyu: {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    subtitle: "Co-Founder, Scaler & InterviewBit",
    image: abhimanyuImage,
    imageAlt:
      "Professional portrait used for Abhimanyu Saxena persona card.",
    description:
      "Analytical, product-minded, and industry-focused guidance on employability, structured growth, and real-world engineering readiness.",
    suggestions: [
      "How do I become industry ready?",
      "What should I focus on beyond DSA?",
      "How do I build real problem-solving ability?",
    ],
  },
};
