export const anniversary = {
  brand: {
    name: "Primitiva Global",
    tagline: "People · Ideas · A Brighter Tomorrow",
  },
  chapters: [
    {
      id: "hero",
      label: "A small team · A big year",
      title: "One Year Together.",
      lines: ["Different cities.", "A shared mission.", "And a year we’re grateful to have shared with you."],
      note: "Quite a year.",
      image: "/images/cat-hero.jpeg",
    },
    {
      id: "you-joined",
      label: "01 / You joined",
      title: "A year ago,\nyou said yes.",
      paragraphs: [
        "You joined a small team still figuring out what it wanted to become.",
        "You brought experience, curiosity, judgment — and a point of view that was entirely your own.",
      ],
      closing: "We’re very glad you did.",
    },
    {
      id: "three-cities",
      label: "02 / Three cities · One team",
      title: "California.\nShanghai.\nNew York.",
      statement: "Three people.\nThree time zones.\nOne very small team.",
      note: "Far apart, but somehow closer than the map suggests.",
      cities: [
        { name: "California", detail: "Perspective", x: 12, y: 58 },
        { name: "New York", detail: "You are here", x: 42, y: 32, featured: true },
        { name: "Shanghai", detail: "Focus", x: 87, y: 60 },
      ],
    },
    {
      id: "investor",
      label: "03 / The investor",
      title: "You have a rare combination:",
      statement: "a rational mind\nand a deeply human one.",
      lines: ["You ask hard questions without losing curiosity.", "You see risk without losing optimism."],
      note: "Sharp thinking. A generous heart.",
    },
    {
      id: "growing",
      label: "04 / Growing together",
      title: "We didn’t always see things the same way.",
      statement: "And that turned out to be one of the good things.",
      paragraphs: [
        "There were disagreements, different working styles, and plenty of adjustment.",
        "But conversation became understanding, and understanding became trust.",
      ],
      note: "Different perspectives. Better questions. Stronger team.",
    },
    {
      id: "small-team",
      label: "05 / A small team",
      title: "People came.\nPeople went.",
      statement: "Eventually, the three of us found our rhythm.",
      lines: ["California. Shanghai. New York.", "Still small. Still figuring things out. Still moving."],
      photos: [
        { src: "/images/team-evening.jpeg", alt: "A teammate smiling during an evening together", caption: "Somewhere between work and life" },
        { src: "/images/team-selfie.jpeg", alt: "Two teammates smiling together", caption: "Different places. Same big questions." },
        { src: "", alt: "Replaceable memory slot", caption: "More memories to come" },
      ],
    },
    {
      id: "cat",
      label: "06 / Another move",
      title: "And somehow,\neven the cat crossed an ocean.",
      statement: "Shanghai → California.",
      lines: ["New home.", "Same attitude."],
      note: "New continent. Same boss.",
      photos: [
        { src: "/images/cat-sleeping.jpeg", alt: "The cream cat asleep on a blanket", caption: "Shanghai · CEO of naps" },
        { src: "/images/cat-standing.jpeg", alt: "The cream cat standing on a scratcher", caption: "California · Still supervising" },
        { src: "/images/cat-hero.jpeg", alt: "The cream cat in the afternoon sun", caption: "Same cat. New timezone." },
      ],
    },
    {
      id: "motion",
      label: "07 / The year in motion",
      title: "A lot happened\nbetween the conversations.",
      milestones: [
        { number: "01", text: "We invested in XXXX.", meta: "Direct investments" },
        { number: "02", text: "We backed several funds.", meta: "Fund investments" },
        { number: "03", text: "We exited X funds.", meta: "Exits" },
        { number: "04", text: "We recovered BlackOak’s early redemption fee.", meta: "Persistence matters" },
      ],
    },
    {
      id: "not-straight",
      label: "08 / Not a straight line",
      title: "Mirumi came.\nAnd then it didn’t.",
      statement: "We kept looking anyway.",
      lines: ["For better opportunities.", "Better ideas.", "Better products."],
      closing: "There is always another question worth asking.",
    },
    {
      id: "notes",
      label: "09 / From us",
      title: "Some things don’t fit into a year-end summary.",
      statement: "Two personal notes.",
      notes: [
        { from: "From Jay", body: ["[Jay’s personal message goes here.]"] },
        {
          from: "From Xuanhe",
          body: [
            "You’ve taught me a lot this year — not only about investing, but about people, judgment, patience, and how experience changes the way you see a problem.",
            "There were plenty of moments when we had to learn how to work with each other. And somewhere along the way, you became a little like the older sister of our tiny team.",
            "Thank you for your patience, your honesty, and for always bringing another perspective to the table.",
          ],
        },
      ],
    },
    {
      id: "thank-you",
      label: "One year with us",
      title: "Thank you.",
      statement: "This year would not\nhave been the same without you.",
      reveal: "Here’s to everything\nwe haven’t discovered yet.",
      closing: "Happy one-year anniversary.",
      note: "On to Year Two.",
    },
  ],
} as const;

export type Chapter = (typeof anniversary.chapters)[number];
