export const MODULES_DATA = [
  {
    id: 'reported-speech',
    title: 'Reported Speech & Pronouns',
    emoji: '🗣️',
    color: 'from-[#6a1cf6] to-[#ac8eff]',
    shadowColor: 'rgba(106, 28, 246, 0.5)',
    description: 'Quy tắc lùi thì, đổi ngôi và từ chỉ thời gian',
    slides: [
      { type: 'cover', title: 'ENGLISH 8', subtitle: 'GRAMMAR MASTERCLASS', badge: 'SEMESTER 2', emoji: '✨' },
      { type: 'content', title: 'Phần 1: POSSESSIVE PRONOUNS', emoji: '🎭', desc: 'Khoác áo mới cho danh từ để tránh bị lặp chữ!', boxTop: 'My dream is to be a singer.\nWhat is 👉 your dream?', boxBottom: 'My dream is to be a singer.\nWhat is 👉 YOURS?' },
      { type: 'table', title: 'Bảng Biến Hình Sở Hữu', emoji: '🧬', col1: 'Đại Từ Nhân Xưng', col2: 'Đại Từ Sở Hữu', rows: [{ c1: 'I', c2: 'mine' }, { c1: 'You', c2: 'yours' }, { c1: 'We', c2: 'ours' }, { c1: 'They', c2: 'theirs' }, { c1: 'He', c2: 'his' }, { c1: 'She', c2: 'hers' }] },
      { type: 'cover', title: 'Phần 2', subtitle: 'REPORTED SPEECH', badge: 'GRAMMAR RULES', emoji: '🗣️' },
      { type: 'rules', title: '3 Quy Tắc Vàng (Golden Rules)', emoji: '⚠️', desc: 'Khi tường thuật lại lời người khác, bắt buộc thay đổi 3 yếu tố:', rules: [{ num: '1', name: 'ĐỔI NGÔI', sub: 'Pronouns' }, { num: '2', name: 'LÙI 1 THÌ', sub: 'Tense' }, { num: '3', name: 'TRẠNG TỪ', sub: 'Time & Place' }] },
      { type: 'content-split', title: 'Rule 1: Đổi Ngôi', emoji: '🔄', leftBox: 'Người Nói\n(I / We)\n\n👉 Đổi thành:\nHe / She / They', rightBox: 'Người Nghe\n(You)\n\n👉 Đổi thành:\nTheo Tân ngữ (O)' },
      { type: 'table', title: 'Rule 2: Lùi 1 Thì', emoji: '⏳', col1: 'Direct (Trực tiếp)', col2: 'Reported (Gián tiếp)', rows: [{ c1: 'am / is / are', c2: 'was / were' }, { c1: 'V (s/es)', c2: 'V2 (ed)' }, { c1: 'can', c2: 'could' }, { c1: 'will', c2: 'would' }, { c1: 'must', c2: 'had to' }] },
      { type: 'word-shift', title: 'Rule 3: Trạng từ', emoji: '⏱️', pairs: [['now', 'then'], ['here', 'there'], ['this / these', 'that / those'], ['today', 'that day'], ['tomorrow', 'the next day'], ['next week', 'the following week']] },
      { type: 'content', title: 'Phần 3: CÂU HỎI YES/NO', emoji: '❓', desc: 'S + asked + IF / WHETHER + S + V', boxTop: 'He asked me, "Are you okay?"\n➔ He asked me IF I WAS okay.', boxBottom: 'LƯU Ý ĐỎ: Không dùng do/does/did. Chủ ngữ phải đứng trước Động từ (đã lùi thì)!' },
      { type: 'boss', title: 'CHALLENGE ACCEPTED!', subtitle: 'Bạn đã sẵn sàng để đối mặt với AI?', emoji: '🤖🐕' }
    ],
    questions: [
      '2. “My uncle is a famous musician and vlogger,” said Nam.',
      '6. "My sister is a singer and she earns a lot of money.", said Isabella.',
      '7. "My cousin can speak English fluently.", he said.',
      '8. “My brother doesn’t like his new mansion.” , he said to me.',
      '10. “This mansion is very large and has expensive sofas.”, he said.',
      '14. They said to him “ We are learning English now”',
      '15. "I want to become a successful doctor," she said.',
      '16. "We are playing football in the stadium," they said to us.',
      '17. "My mother can cook Italian food very well," Mary said.',
      '18. "I don’t know the answer to this question," he told me.',
      '19. "Our teachers are organizing a volunteer program now," the students said.',
      '20. "This smartphone is too expensive for me," Peter said.',
      '21. "I usually do my homework after dinner," Anna told him.',
      '22. "We can’t find the tickets for the concert," they said.',
      '23. "The internet connection is really slow today," my brother said.',
      '24. "I am watching a documentary about aliens," she said to her friend.'
    ]
  },

  {
    id: 'past-continuous',
    title: 'When & While',
    emoji: '⏳',
    color: 'from-[#ff7eb3] to-[#ff758c]',
    shadowColor: 'rgba(255, 117, 140, 0.5)',
    description: 'Thì Quá khứ Tiếp diễn & Đơn (Cắt ngang & Song song)',
    slides: [
      { type: 'cover', title: 'WHEN & WHILE', subtitle: 'PAST CONTINUOUS VS PAST SIMPLE', badge: 'MODULE 2', emoji: '⏳' },
      { type: 'content-split', title: 'Hành động Kéo Dài vs Bị Cắt Ngang', emoji: '🎬', leftBox: 'Hành động đang kéo dài:\nDùng Quá khứ tiếp diễn\n(was/were + V-ing)', rightBox: 'Hành động xen vào:\nDùng Quá khứ đơn\n(V2 / ed)' },
      { type: 'word-shift', title: 'WHILE (Trong khi)', emoji: '⏸️', pairs: [['While', 'Thường đi với hành động kéo dài, đang xảy ra (V-ing)'], ['Ví dụ', 'While I was sleeping... (Trong lúc tôi ĐANG ngủ)']] },
      { type: 'word-shift', title: 'WHEN (Khi mà)', emoji: '⚡', pairs: [['When', 'Thường đi với hành động xen vào vô duyên (V-ed/V2)'], ['Ví dụ', '...When the phone rang. (Trời ơi điện thoại RENG)']] },
      { type: 'content', title: 'Kết hợp When & While', emoji: '🤝', desc: 'Có thể đổi vị trí mệnh đề tùy ý (nhớ có dấu phẩy nếu đảo lên trước)', boxTop: 'I was watching TV when he came.\n➔ When he came, I was watching TV.', boxBottom: 'Or: While I was watching TV, he came.' },
      { type: 'boss', title: 'CHALLENGE ACCEPTED!', subtitle: 'When hay While đây?', emoji: '⏱️⚡' }
    ],
    questions: [
      '1. When he came, I was watching a football match. ➔ I was watching...',
      '4. When we were on holiday, we spent a lot of money. ➔ While...',
      '15. She was reading a book when the power went out. ➔ While...',
      '16. We were sleeping when the alarm rang. ➔ The alarm...',
      '17. He was driving to work when he saw an accident. ➔ While...',
      '18. They were playing video games when their mom called. ➔ While...',
      '19. I was walking in the park when it started to rain. ➔ It started to rain...',
      '20. The teacher walked in while the students were talking. ➔ When...',
      '21. While I was running to the bus stop, I dropped my phone. ➔ I dropped...',
      '22. We were having a picnic when we heard a loud noise. ➔ While...'
    ]
  },

  {
    id: 'comparisons',
    title: 'Comparisons',
    emoji: '⚖️',
    color: 'from-[#4facfe] to-[#00f2fe]',
    shadowColor: 'rgba(0, 242, 254, 0.5)',
    description: 'So Sánh Bằng (as...as) và So Sánh Hơn',
    slides: [
      { type: 'cover', title: 'COMPARISONS', subtitle: 'SO SÁNH', badge: 'MODULE 3', emoji: '⚖️' },
      { type: 'content-split', title: 'Hai Thái Cực So Sánh', emoji: '🎭', leftBox: 'So sánh HƠN:\nA is taller than B\nA runs faster than B', rightBox: 'So sánh KÉM hơn / KHÔNG BẰNG:\nB is NOT AS TALL AS A\nB DOES NOT RUN AS FAST AS A' },
      { type: 'table', title: 'Bất Quy Tắc Huyền Thoại', emoji: '✨', col1: 'Tính/Trạng từ gốc', col2: 'Dạng so sánh hơn', rows: [{ c1: 'good / well', c2: 'better' }, { c1: 'bad / badly', c2: 'worse' }, { c1: 'far', c2: 'farther / further' }, { c1: 'much / many', c2: 'more' }] },
      { type: 'content', title: 'Công Thức "Không Bằng"', emoji: '⛔', desc: 'Dùng NOT AS ... AS để viết lại câu So sánh Hơn hoặc So sánh Nhất', boxTop: 'He runs faster than me.\n➔ I DO NOT run AS FAST AS him.', boxBottom: 'Tom is the best player.\n➔ No one plays AS WELL AS Tom.' },
      { type: 'boss', title: 'CHALLENGE ACCEPTED!', subtitle: 'Bạn có tự tin không ai giỏi BẰNG bạn?', emoji: '👑' }
    ],
    questions: [
      '3. John is a better player than anyone else in the team. ➔ No one in the team plays...',
      '5. They work much harder than we do. ➔ We don’t work...',
      '13. Her performance is more excellent than anyone else’s. ➔ She performs...',
      '23. A car is more expensive than a motorbike. ➔ A motorbike isn\'t...',
      '24. She speaks English more fluently than her brother. ➔ Her brother doesn\'t speak...',
      '25. The first exam was easier than the second one. ➔ The second exam wasn\'t...',
      '26. Peter is taller than all the other boys in the class. ➔ No other boy in the class is...',
      '27. This test is more difficult than I expected. ➔ I didn\'t expect the test to be...',
      '28. I run faster than my dog. ➔ My dog doesn\'t...',
      '29. Tom drives more carefully than David. ➔ David doesn\'t drive...'
    ]
  },

  {
    id: 'distance',
    title: 'Asking For Distance',
    emoji: '🛣️',
    color: 'from-[#f6d365] to-[#fda085]',
    shadowColor: 'rgba(253, 160, 133, 0.5)',
    description: 'Hỏi khoảng cách: Từ A đến B bao xa?',
    slides: [
      { type: 'cover', title: 'DISTANCE', subtitle: 'How far is it...?', badge: 'MODULE 4', emoji: '🛣️' },
      { type: 'content', title: 'Đo Khoảng Cách', emoji: '📏', desc: 'Có 2 cách hỏi phổ biến về khoảng cách', boxTop: 'Cách 1: What is the distance between A and B?', boxBottom: 'Cách 2: How far is it from A to B?' },
      { type: 'quick-test', title: 'Dịch thuật nhanh!', emoji: '⚡', desc: 'Thử chuyển từ mẫu 1 sang mẫu 2 nhé!', q1: 'What is the distance between your house and school?', a1: 'How far is it from your house to school?', q2: 'What is the distance between HN and HCM?', a2: 'How far is it from HN to HCM?' },
      { type: 'boss', title: 'CHALLENGE ACCEPTED!', subtitle: 'Đi thôi!', emoji: '🚀' }
    ],
    questions: [
      '9. What is the distance between Hanoi and Hai Phong? ➔ How far...',
      '30. What is the distance between your house and the school? ➔ How far...',
      '31. What is the distance between the Earth and the Moon? ➔ How far is it...',
      '32. What is the distance between the post office and the bank? ➔ How far...',
      '33. What is the distance between Ho Chi Minh City and Vung Tau? ➔ How far...',
      '34. What is the distance between London and Paris? ➔ How far...'
    ]
  }
];
