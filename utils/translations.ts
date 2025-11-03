export type Language = 'sv' | 'en';

export const translations = {
  sv: {
    // Navigation & Common
    home: 'Hem',
    profile: 'Profil',
    achievements: 'Prestationer',
    shop: 'Butik',
    settings: 'Inställningar',
    signOut: 'Logga ut',
    signIn: 'Logga in',
    email: 'E-post',
    password: 'Lösenord',
    name: 'Namn',
    continue: 'Fortsätt',
    back: 'Tillbaka',
    start: 'Starta',
    submit: 'Skicka',
    close: 'Stäng',
    
    // Auth
    signInWithGoogle: 'Logga in med Google',
    signInWithGithub: 'Logga in med GitHub',
    signInWithEmail: 'Logga in med e-post',
    signUpWithEmail: 'Skapa konto med e-post',
    orSignInWith: 'Eller logga in med',
    alreadyHaveAccount: 'Har du redan ett konto?',
    dontHaveAccount: 'Har du inget konto?',
    signUp: 'Skapa konto',
    
    // Game Selection
    mathQuest: 'Matematik Quest',
    chooseGame: 'Välj din utmaning och förbättra dina matematikkunskaper!',
    quickMath: 'Snabb Matte',
    quickMathDesc: 'Svara på grundläggande räkneoperationer så snabbt du kan!',
    algebraGame: 'Algebra',
    algebraGameDesc: 'Lös ekvationer och förenkla uttryck',
    geometryGame: 'Geometri',
    geometryGameDesc: 'Lös geometriska problem och beräkna areor',
    calculusGame: 'Analys',
    calculusGameDesc: 'Derivera och integrera funktioner',
    statisticsGame: 'Statistik',
    statisticsGameDesc: 'Sannolikhet och statistiska beräkningar',
    playNow: 'Spela nu',
    
    // Profile
    level: 'Nivå',
    xp: 'XP',
    streak: 'Streak',
    credits: 'Credits',
    gamesPlayed: 'Spelade spel',
    correctAnswers: 'Korrekta svar',
    currentStreak: 'Nuvarande streak',
    totalXP: 'Total XP',
    
    // Game
    score: 'Poäng',
    question: 'Fråga',
    questions: 'Frågor',
    timeLeft: 'Tid kvar',
    yourAnswer: 'Ditt svar',
    correct: 'Rätt!',
    incorrect: 'Fel!',
    gameOver: 'Spelet slut',
    gameComplete: 'Spelet klart',
    earnedXP: 'Du fick {xp} XP!',
    earnedCredits: 'Du fick {credits} credits!',
    
    // Difficulty
    difficulty: 'Svårighetsgrad',
    ma1: 'Matematik 1',
    ma2: 'Matematik 2',
    ma3: 'Matematik 3',
    ma4: 'Matematik 4',
    ma5: 'Matematik 5',
    university: 'Universitet',
    
    // Shop
    itemShop: 'Objektbutik',
    shopDescription: 'Anpassa din profil med unika föremål',
    yourCredits: 'Dina credits',
    avatarFrames: 'Avatarramar',
    themes: 'Teman',
    titles: 'Titlar',
    purchase: 'Köp',
    purchased: 'Köpt',
    equip: 'Utrusta',
    equipped: 'Utrustad',
    notEnoughCredits: 'Inte tillräckligt med credits',
    
    // Achievements
    achievementsTitle: 'Prestationer',
    unlocked: 'Upplåst',
    locked: 'Låst',
    xpReward: '{xp} XP Belöning',
    
    // Achievement names
    speedDemon: 'Hastighetsdemon',
    speedDemonDesc: 'Svara rätt på 10 frågor i Snabb Matte',
    algebraMaster: 'Algebramästare',
    algebraMasterDesc: 'Lös 10 algebraproblem korrekt',
    geometryExpert: 'Geometriexpert',
    geometryExpertDesc: 'Lös 10 geometriproblem korrekt',
    calculusGenius: 'Analysgeni',
    calculusGeniusDesc: 'Lös 10 analysproblem korrekt',
    perfectScore: 'Perfekt poäng',
    perfectScoreDesc: 'Få alla frågor rätt i ett spel',
  },
  en: {
    // Navigation & Common
    home: 'Home',
    profile: 'Profile',
    achievements: 'Achievements',
    shop: 'Shop',
    settings: 'Settings',
    signOut: 'Sign Out',
    signIn: 'Sign In',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    continue: 'Continue',
    back: 'Back',
    start: 'Start',
    submit: 'Submit',
    close: 'Close',
    
    // Auth
    signInWithGoogle: 'Sign in with Google',
    signInWithGithub: 'Sign in with GitHub',
    signInWithEmail: 'Sign in with Email',
    signUpWithEmail: 'Sign up with Email',
    orSignInWith: 'Or sign in with',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    signUp: 'Sign Up',
    
    // Game Selection
    mathQuest: 'Math Quest',
    chooseGame: 'Choose your challenge and improve your math skills!',
    quickMath: 'Quick Math',
    quickMathDesc: 'Answer basic arithmetic as fast as you can!',
    algebraGame: 'Algebra',
    algebraGameDesc: 'Solve equations and simplify expressions',
    geometryGame: 'Geometry',
    geometryGameDesc: 'Solve geometric problems and calculate areas',
    calculusGame: 'Calculus',
    calculusGameDesc: 'Differentiate and integrate functions',
    statisticsGame: 'Statistics',
    statisticsGameDesc: 'Probability and statistical calculations',
    playNow: 'Play Now',
    
    // Profile
    level: 'Level',
    xp: 'XP',
    streak: 'Streak',
    credits: 'Credits',
    gamesPlayed: 'Games Played',
    correctAnswers: 'Correct Answers',
    currentStreak: 'Current Streak',
    totalXP: 'Total XP',
    
    // Game
    score: 'Score',
    question: 'Question',
    questions: 'Questions',
    timeLeft: 'Time Left',
    yourAnswer: 'Your answer',
    correct: 'Correct!',
    incorrect: 'Incorrect!',
    gameOver: 'Game Over',
    gameComplete: 'Game Complete',
    earnedXP: 'You earned {xp} XP!',
    earnedCredits: 'You earned {credits} credits!',
    
    // Difficulty
    difficulty: 'Difficulty',
    ma1: 'Math 1',
    ma2: 'Math 2',
    ma3: 'Math 3',
    ma4: 'Math 4',
    ma5: 'Math 5',
    university: 'University',
    
    // Shop
    itemShop: 'Item Shop',
    shopDescription: 'Customize your profile with unique items',
    yourCredits: 'Your credits',
    avatarFrames: 'Avatar Frames',
    themes: 'Themes',
    titles: 'Titles',
    purchase: 'Purchase',
    purchased: 'Purchased',
    equip: 'Equip',
    equipped: 'Equipped',
    notEnoughCredits: 'Not enough credits',
    
    // Achievements
    achievementsTitle: 'Achievements',
    unlocked: 'Unlocked',
    locked: 'Locked',
    xpReward: '{xp} XP Reward',
    
    // Achievement names
    speedDemon: 'Speed Demon',
    speedDemonDesc: 'Answer 10 questions correctly in Quick Math',
    algebraMaster: 'Algebra Master',
    algebraMasterDesc: 'Solve 10 algebra problems correctly',
    geometryExpert: 'Geometry Expert',
    geometryExpertDesc: 'Solve 10 geometry problems correctly',
    calculusGenius: 'Calculus Genius',
    calculusGeniusDesc: 'Solve 10 calculus problems correctly',
    perfectScore: 'Perfect Score',
    perfectScoreDesc: 'Get all questions correct in a game',
  }
};

export function t(key: string, lang: Language, params?: Record<string, any>): string {
  let text = translations[lang][key as keyof typeof translations['sv']] || key;
  
  if (params) {
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
  }
  
  return text;
}
