export type QuestionType = "multiple-choice" | "word-form" | "rewriting" | "sign-reading";

export interface MultipleChoiceQuestion {
  id: string;
  type: "multiple-choice";
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface WordFormQuestion {
  id: string;
  type: "word-form" | "rewriting";
  prompt: string;
  baseWord?: string;
  expectedAnswer: string;
}

// Section 1: Pronunciation & Stress (7 questions)
export const grade6MCPronunciation: MultipleChoiceQuestion[] = [
  { id: "mc1", type: "multiple-choice", question: "Choose the word whose underlined part is pronounced differently: visited, called, followed, believed", options: { A: "visited", B: "called", C: "followed", D: "believed" }, correctAnswer: "A", explanation: "'visited' phát âm đuôi -ed là /id/, còn lại là /d/." },
  { id: "mc2", type: "multiple-choice", question: "Choose a word that has a different stress pattern: oxygen, volunteer, gravity, hospital", options: { A: "oxygen", B: "volunteer", C: "gravity", D: "hospital" }, correctAnswer: "B", explanation: "'volunteer' nhấn âm 3, các từ còn lại nhấn âm 1." },
  { id: "mc3", type: "multiple-choice", question: "Choose the word whose underlined part is pronounced differently: added, painted, stayed, posted", options: { A: "added", B: "painted", C: "stayed", D: "posted" }, correctAnswer: "C", explanation: "'stayed' phát âm đuôi -ed là /d/, còn lại là /id/." },
  { id: "mc4", type: "multiple-choice", question: "Choose the word that has a different stress pattern: engineer, musician, designer, director", options: { A: "engineer", B: "musician", C: "designer", D: "director" }, correctAnswer: "A", explanation: "'engineer' nhấn âm 3, các từ còn lại nhấn âm 2." },
  { id: "mc5", type: "multiple-choice", question: "Choose the word whose underlined part is pronounced differently: ceremony, basket, embroidery, experience", options: { A: "ceremony", B: "basket", C: "embroidery", D: "experience" }, correctAnswer: "A", explanation: "'ceremony' phát âm /s/ hoặc khác quy tắc của các từ kia." },
  { id: "mc6", type: "multiple-choice", question: "Choose the word whose underlined part is pronounced differently: heat, bread, bean, peach", options: { A: "heat", B: "bread", C: "bean", D: "peach" }, correctAnswer: "B", explanation: "'bread' phát âm là /e/, còn lại /i:/." },
  { id: "mc7", type: "multiple-choice", question: "Choose the word that has the main stress differently: reuse, reduce, inform, follow", options: { A: "reuse", B: "reduce", C: "inform", D: "follow" }, correctAnswer: "D", explanation: "'follow' nhấn âm 1, còn lại nhấn âm 2." },
];

// Section 2: Vocabulary & Grammar (24 questions)
export const grade6MCGrammar: MultipleChoiceQuestion[] = [
  { id: "mc8", type: "multiple-choice", question: "They saw a triangle UFO _____ and fly off the tall building.", options: { A: "sighting", B: "hover", C: "visit", D: "characters" }, correctAnswer: "B", explanation: "Cấu trúc saw something do something mô tả hành động thấy toàn bộ quá trình." },
  { id: "mc9", type: "multiple-choice", question: "Last night, I _____ in the park when a huge frog appeared.", options: { A: "jogging", B: "was jogging", C: "jogged", D: "were jog" }, correctAnswer: "B", explanation: "Hành động đang diễn ra trong quá khứ dùng Past Continuous (was/were V-ing)." },
  { id: "mc10", type: "multiple-choice", question: "Venus’s gravity is similar _____ Earth’s.", options: { A: "in", B: "with", C: "to", D: "on" }, correctAnswer: "C", explanation: "Công thức 'be similar to' nghĩa là tương tự với.", },
  { id: "mc11", type: "multiple-choice", question: "The rescue team used a _____ and a plane to search for the missing victims.", options: { A: "helicopter", B: "balloon", C: "sports car", D: "yacht" }, correctAnswer: "A", explanation: "Helicopter (trực thăng) là phương tiện bay tìm kiếm trên núi." },
  { id: "mc12", type: "multiple-choice", question: "I’m trying to eat healthily. I eat a lot of _____ food.", options: { A: "fast", B: "fried", C: "cheap", D: "steamed" }, correctAnswer: "D", explanation: "Steamed food (đồ hấp) là lựa chọn tốt cho sức khỏe." },
  { id: "mc13", type: "multiple-choice", question: "The new e-Pad comes with more than 500 _____. Its users can download more.", options: { A: "gigabytes", B: "batteries", C: "cameras", D: "inches" }, correctAnswer: "A", explanation: "Gigabytes là đơn vị dung lượng." },
  { id: "mc14", type: "multiple-choice", question: "They find it difficult to sleep or focus _____ their schoolwork.", options: { A: "for", B: "at", C: "on", D: "in" }, correctAnswer: "C", explanation: "focus on = tập trung vào." },
  { id: "mc15", type: "multiple-choice", question: "This phone has a great screen. _____, the battery is terrible.", options: { A: "So", B: "However", C: "And", D: "But" }, correctAnswer: "B", explanation: "However đứng đầu câu sau đó có dấu phẩy mang nghĩa chuyển ý (tuy nhiên)." },
  { id: "mc16", type: "multiple-choice", question: "Come and take _____ in the 2024 Mid-Autumn Festival.", options: { A: "place", B: "part", C: "past", D: "piece" }, correctAnswer: "B", explanation: "take part in = tham gia vào." },
  { id: "mc17", type: "multiple-choice", question: "My dream is to be a _____ because I want to be famous and have lots of fans.", options: { A: "flight attendance", B: "celebrity", C: "mansion", D: "yacht" }, correctAnswer: "B", explanation: "celebrity (người nổi tiếng) hợp lý vì muốn có nhiều fans." },
  { id: "mc18", type: "multiple-choice", question: "Her favorite actor is Robin Williams. Who is _____?", options: { A: "yours", B: "you", C: "your", D: "yourself" }, correctAnswer: "A", explanation: "yours là đại từ sở hữu thay thế cho 'your favorite actor'." },
  { id: "mc19", type: "multiple-choice", question: "_____ is the screen size of your laptop? – It’s 13.3 inches.", options: { A: "Which", B: "Where", C: "What", D: "How" }, correctAnswer: "C", explanation: "What is the size = Kích thước là bao nhiêu." },
  { id: "mc20", type: "multiple-choice", question: "Researchers started to search for evidence of _____ but some say they were normal people in strange clothes.", options: { A: "flying saucers", B: "aliens", C: "monsters", D: "UFOs" }, correctAnswer: "B", explanation: "aliens = người ngoài hành tinh" },
  { id: "mc21", type: "multiple-choice", question: "My brother is a(n) ____________. He takes care of animals all day.", options: { A: "designer", B: "veterinarian", C: "director", D: "engineer" }, correctAnswer: "B", explanation: "veterinarian (Bác sĩ thú y) chăm sóc động vật." },
  { id: "mc22", type: "multiple-choice", question: "To meet her parents’ _____, she spends five hours practicing the piano every day.", options: { A: "relationship", B: "expectation", C: "pressure", D: "forum" }, correctAnswer: "B", explanation: "meet expectations = đáp ứng kỳ vọng." },
  { id: "mc23", type: "multiple-choice", question: "In a weightless environment, everything floats _____.", options: { A: "uncontrollably", B: "downwards", C: "smoothly", D: "constantly" }, correctAnswer: "A", explanation: "Trong môi trường không trọng lực mọi thứ trôi nổi không kiểm soát." },
  { id: "mc24", type: "multiple-choice", question: "On June 2, 1966, Surveyor 1 became the first U.S _____ to land on the moon.", options: { A: "flying saucer", B: "airplane", C: "spacecraft", D: "helicopter" }, correctAnswer: "C", explanation: "Spacecraft = Tàu vũ trụ." },
  { id: "mc25", type: "multiple-choice", question: "Mr Brown _____ in Paris when the Second World War broke out.", options: { A: "lived", B: "was living", C: "had lived", D: "will live" }, correctAnswer: "B", explanation: "was living -> Hành động đang xảy ra (quá khứ tiếp diễn) thì hành động khác cắt ngang." },
  { id: "mc26", type: "multiple-choice", question: "However, for this week only, the Portal 6 is _____ sale for just 480 dollars.", options: { A: "by", B: "with", C: "off", D: "on" }, correctAnswer: "D", explanation: "Cụm từ 'on sale' = đang giảm giá." },
  { id: "mc27", type: "multiple-choice", question: "I want to go to university because it's my _____ to become a doctor.", options: { A: "dream", B: "director", C: "engineer", D: "dentist" }, correctAnswer: "A", explanation: "dream = giấc mơ." },
  { id: "mc28", type: "multiple-choice", question: "I want to make my own movies, so I want to be a (n) _____.", options: { A: "dream", B: "director", C: "engineer", D: "dentist" }, correctAnswer: "B", explanation: "director = đạo diễn." },
  { id: "mc29", type: "multiple-choice", question: "I want to help people have beautiful smiles. I want to be a(n) _____.", options: { A: "dream", B: "director", C: "engineer", D: "dentist" }, correctAnswer: "D", explanation: "dentist = nha sĩ." },
  { id: "mc30", type: "multiple-choice", question: "My sister is a(n) _____. She makes videos for viewers on the internet.", options: { A: "vlogger", B: "director", C: "engineer", D: "dentist" }, correctAnswer: "A", explanation: "vlogger = người làm video blog." },
  { id: "mc31", type: "multiple-choice", question: "If I work hard and save my money, I can become a _____.", options: { A: "director", B: "celebrity", C: "millionaire", D: "singer" }, correctAnswer: "C", explanation: "millionaire = triệu phú." },
];

export const grade6Rewriting: WordFormQuestion[] = [
  { id: "rw1", type: "rewriting", prompt: "_____ (Rewrite): She was reading a book, and the man came in.", expectedAnswer: "The man came in when she was reading a book" },
  { id: "rw2", type: "rewriting", prompt: "_____ (Rewrite): 'My uncle is a famous musician and vlogger,' said Nam.", expectedAnswer: "Nam told me his uncle was a famous musician and vlogger" },
  { id: "rw3", type: "rewriting", prompt: "_____ (Rewrite): His brother doesn't work as hard as John.", expectedAnswer: "John works harder than his brother" },
  { id: "rw4", type: "rewriting", prompt: "_____ (Rewrite): We were driving down the hill. A strange object suddenly appeared in the sky.", expectedAnswer: "When we were driving down the hill, a strange object suddenly appeared in the sky" },
  { id: "rw5", type: "rewriting", prompt: "_____ (Rewrite): The old computer system doesn't work as effectively as the new one.", expectedAnswer: "The new computer system works more effectively than the old one" },
  { id: "rw6", type: "rewriting", prompt: "_____ (Rewrite): 'My sister is a singer and she earns a lot of money,' said Isabella.", expectedAnswer: "Isabella said her sister was a singer and she earned a lot of money" },
  { id: "rw7", type: "rewriting", prompt: "_____ (Rewrite): 'My brother doesn't like his new mansion,' he said to me.", expectedAnswer: "He told me his brother didn't like his new mansion" },
  { id: "rw8", type: "rewriting", prompt: "_____ (Rewrite): What is the distance between your house and the nearest supermarket?", expectedAnswer: "How far is it from your house to the nearest supermarket" },
  { id: "rw9", type: "rewriting", prompt: "_____ (Rewrite): 'This mansion is very large and has expensive sofas.'", expectedAnswer: "He said that mansion was very large and had expensive sofas" },
  { id: "rw10", type: "rewriting", prompt: "_____ (Rewrite): The farmers were working on the farm; they saw a flying saucer in the sky.", expectedAnswer: "When the farmers were working on the farm, they saw a flying saucer in the sky" },
  { id: "rw11", type: "rewriting", prompt: "_____ (Rewrite): TF01 can function better than its previous model.", expectedAnswer: "The TF01 previous model can't function as well as the new one" },
  { id: "rw12", type: "rewriting", prompt: "_____ (Rewrite): It is impossible to learn a foreign language in a week.", expectedAnswer: "Learning a foreign language in a week is impossible" }
];

export const grade6WordForms: WordFormQuestion[] = [
  { id: "wf1", type: "word-form", prompt: "Andrew dreams of being a _____ when he is eighteen years old.", baseWord: "million", expectedAnswer: "millionaire" },
  { id: "wf2", type: "word-form", prompt: "Schoolwork can be very _____ to some teenagers.", baseWord: "stress", expectedAnswer: "stressful" },
  { id: "wf3", type: "word-form", prompt: "As dark fell, _____ were still searching for missing climbers.", baseWord: "rescue", expectedAnswer: "rescuers" },
  { id: "wf4", type: "word-form", prompt: "The plane suddenly _____ from the radar screen.", baseWord: "appear", expectedAnswer: "disappeared" },
  { id: "wf5", type: "word-form", prompt: "That was an impressive _____ from such a young tennis player.", baseWord: "perform", expectedAnswer: "performance" },
  { id: "wf6", type: "word-form", prompt: "I’ve _____ this problem for 2 months, but I haven’t finished.", baseWord: "solution", expectedAnswer: "been solving" },
  { id: "wf7", type: "word-form", prompt: "The causes of the phenomenon are still _____ understood.", baseWord: "complete", expectedAnswer: "incompletely" },
  { id: "wf8", type: "word-form", prompt: "Teenagers need _____ from their parents, but not all parents are willing to encourage their children.", baseWord: "encourage", expectedAnswer: "encouragement" },
  { id: "wf9", type: "word-form", prompt: "The UFO flew across the city and _____ disappeared in the sky.", baseWord: "quick", expectedAnswer: "quickly" },
  { id: "wf10", type: "word-form", prompt: "Trinh Cong Son is one of the great _____ in Vietnam.", baseWord: "music", expectedAnswer: "musicians" },
  ...grade6Rewriting
];
