export const PLANET_INTERPRETATIONS: Record<string, Record<string, string>> = {
  Sun: {
    Aries: "Your core identity is bold, courageous, and pioneering. You're a natural leader who thrives on challenge.",
    Taurus: "Your essence is stable, patient, and determined. You value security and have a strong connection to the physical world.",
    Gemini: "Your core self is curious, adaptable, and communicative. You thrive on variety and intellectual stimulation.",
    Cancer: "Your identity is nurturing, intuitive, and emotionally deep. Family and home are central to who you are.",
    Leo: "Your essence is creative, dramatic, and warm-hearted. You shine when expressing yourself and being appreciated.",
    Virgo: "Your core self is analytical, practical, and service-oriented. You find meaning in helping others and perfecting skills.",
    Libra: "Your identity is diplomatic, harmonious, and relationship-focused. You seek balance and beauty in all things.",
    Scorpio: "Your essence is intense, passionate, and transformative. You dive deep and aren't afraid of life's mysteries.",
    Sagittarius: "Your core self is adventurous, optimistic, and philosophical. You seek truth and meaning through exploration.",
    Capricorn: "Your identity is ambitious, disciplined, and responsible. You're built for achievement and long-term success.",
    Aquarius: "Your essence is innovative, independent, and humanitarian. You see the world differently and value freedom.",
    Pisces: "Your core self is compassionate, artistic, and spiritually connected. You're deeply empathetic and intuitive."
  },
  Moon: {
    Aries: "Your emotional nature is impulsive and direct. You react quickly and passionately to situations.",
    Taurus: "You need emotional stability and physical comfort. Your feelings are steady and loyal.",
    Gemini: "Your emotions are expressed through communication. You process feelings by talking about them.",
    Cancer: "You're deeply emotional and nurturing. Your feelings ebb and flow like the tides.",
    Leo: "You need emotional recognition and appreciation. Your feelings are warm and dramatic.",
    Virgo: "You analyze your emotions and seek to improve them. You express care through practical help.",
    Libra: "You seek emotional harmony and partnership. Your feelings are influenced by relationships.",
    Scorpio: "Your emotions run deep and intense. You feel everything powerfully and transform through feelings.",
    Sagittarius: "You need emotional freedom and adventure. Your feelings are optimistic and expansive.",
    Capricorn: "You're emotionally reserved and responsible. You express feelings through actions.",
    Aquarius: "Your emotions are detached and intellectual. You value emotional independence.",
    Pisces: "You're emotionally sensitive and empathetic. Your feelings blend with others easily."
  }
};

export const HOUSE_INTERPRETATIONS: Record<number, string> = {
  1: "House of Self - Your personality, appearance, and approach to life. How you present yourself to the world.",
  2: "House of Value - Your possessions, self-worth, and material resources. What you value and how you find security.",
  3: "House of Communication - Your mind, siblings, and local community. How you learn and share information.",
  4: "House of Home - Your roots, family, and emotional foundations. Your inner world and private life.",
  5: "House of Pleasure - Your creativity, romance, and self-expression. What brings you joy and how you play.",
  6: "House of Health - Your daily routines, work, and well-being. How you serve others and maintain wellness.",
  7: "House of Partnership - Your relationships, marriage, and open enemies. How you connect with others one-on-one.",
  8: "House of Transformation - Your shared resources, intimacy, and rebirth. How you transform and regenerate.",
  9: "House of Philosophy - Your higher education, travel, and beliefs. Your quest for meaning and truth.",
  10: "House of Career - Your profession, reputation, and public life. Your contribution to society and legacy.",
  11: "House of Friendships - Your hopes, social circles, and networks. Your connection to groups and humanity.",
  12: "House of the Subconscious - Your spirituality, secrets, and solitude. Your inner world and hidden strengths."
};

export const ASPECT_INTERPRETATIONS: Record<string, string> = {
  "Conjunction": "Intense blending and focusing of energies. These planets work together strongly.",
  "Opposition": "Tension and polarity requiring balance. These planets represent opposing needs to integrate.",
  "Trine": "Natural flow and harmony. These energies support each other easily and effortlessly.",
  "Square": "Tension and challenge leading to growth. These planets push you to evolve through conflict.",
  "Sextile": "Opportunity and cooperation. These planets offer potential that requires effort to activate.",
  "Quincunx": "Adjustment and realignment needed. These planets ask you to integrate seemingly incompatible needs.",
  "Semisextile": "Subtle tension and growth opportunity. These planets gently push you to expand.",
  "Semisquare": "Mild friction and motivation. These planets create productive tension.",
  "Sesquiquadrate": "Persistent challenge requiring creative solutions. These planets demand innovative approaches."
};