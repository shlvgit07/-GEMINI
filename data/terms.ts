import { Term } from "../types";

export const DICTIONARY_TERMS: Term[] = [
  // --- Pseudo Code (הוראות מחשב) ---
  {
    id: 'p1',
    title: 'השמה (Assignment)',
    category: 'pseudo',
    description: 'הכנסת ערך לתוך משתנה. בדרך כלל מחליפה את הערך הקודם שהיה בו.',
    codeExample: `1. שים ב-A את המספר 5
2. שים ב-B את הערך של A + 2
// בסוף: A=5, B=7`,
    explanation: 'הפקודה "שים ב..." או "=" מעדכנת את הזיכרון של המשתנה. כל ערך שהיה ב-A לפני כן נמחק.'
  },
  {
    id: 'p2',
    title: 'תנאי (If/Else)',
    category: 'pseudo',
    description: 'ביצוע פקודות רק אם מתקיים תנאי מסוים.',
    codeExample: `1. שים ב-X את 10
2. אם X > 5 אז:
3.    חסר מ-X את 2
4. אחרת:
5.    הוסף ל-X את 2
// בסוף: X=8 (כי 10 גדול מ-5)`,
    explanation: 'המחשב בודק את התנאי. אם הוא אמת - מבצע את הבלוק הראשון. אם שקר - מבצע את הבלוק של "אחרת" (אם קיים).'
  },
  {
    id: 'p3',
    title: 'לולאה (Loop/While)',
    category: 'pseudo',
    description: 'חזרה על קטע קוד כל עוד תנאי מסוים מתקיים.',
    codeExample: `1. שים ב-K את 0
2. כל עוד K < 3 בצע:
3.    הוסף ל-K את 1
4. סוף לולאה
// הלולאה תרוץ 3 פעמים. בסוף K=3`,
    explanation: 'לולאת "כל עוד" בודקת את התנאי לפני כל הרצה. ברגע ש-K מגיע ל-3, התנאי (3 < 3) הוא שקר והלולאה מסתיימת.'
  },
  {
    id: 'p4',
    title: 'קפיצה (Jump/Goto)',
    category: 'pseudo',
    description: 'דילוג לשורה אחרת בקוד, לעיתים קרובות בשילוב עם תנאי.',
    codeExample: `1. שים ב-A את 1
2. הוסף ל-A את 1
3. אם A < 4 עבור לשורה 2
4. הדפס A
// הקוד יחזור לשורה 2 פעמיים נוספות. בסוף יודפס 4`,
    explanation: 'פקודת "עבור ל..." משנה את סדר הריצה הרגיל (מלמעלה למטה) ומאפשרת ליצור לולאות בצורה ידנית.'
  },
  {
    id: 'p5',
    title: 'מערך (Array)',
    category: 'pseudo',
    description: 'אוסף של משתנים תחת שם אחד, כאשר ניגשים לכל אחד מהם לפי אינדקס (מיקום).',
    codeExample: `ARR = [10, 20, 30]
שים ב-X את ARR[0]  // X יקבל 10
שים ב-ARR[1] את 50 // המערך יהיה [10, 50, 30]`,
    explanation: 'זכור! במדעי המחשב הספירה מתחילה לרוב מ-0. האיבר הראשון הוא באינדקס 0.',
    visualSvg: `<svg viewBox="0 0 300 80" class="w-full h-full">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
        </marker>
      </defs>
      <rect x="10" y="20" width="50" height="50" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
      <text x="35" y="50" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-weight="bold" fill="#0369a1">10</text>
      <text x="35" y="15" text-anchor="middle" font-size="10" fill="#64748b">Idx 0</text>
      
      <rect x="60" y="20" width="50" height="50" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
      <text x="85" y="50" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-weight="bold" fill="#0369a1">20</text>
      <text x="85" y="15" text-anchor="middle" font-size="10" fill="#64748b">Idx 1</text>
      
      <rect x="110" y="20" width="50" height="50" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2"/>
      <text x="135" y="50" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-weight="bold" fill="#0369a1">30</text>
      <text x="135" y="15" text-anchor="middle" font-size="10" fill="#64748b">Idx 2</text>
    </svg>`
  },
  {
    id: 'p6',
    title: 'מודולו (Modulo)',
    category: 'pseudo',
    description: 'פעולה המחשבת את שארית החלוקה.',
    codeExample: `A = 10 Mod 3
// 10 לחלק ל-3 זה 3 עם שארית 1.
// לכן A יהיה שווה ל-1.
B = 12 Mod 4
// 12 מתחלק ב-4 ללא שארית. B=0.`,
    explanation: 'שימושי מאוד לבדיקת זוגיות (Mod 2) או למחזוריות.'
  },
  {
    id: 'p7',
    title: 'החלפת משתנים (Swap)',
    category: 'pseudo',
    description: 'טכניקה להחלפת ערכים בין שני משתנים באמצעות משתנה עזר.',
    codeExample: `TEMP = A
A = B
B = TEMP
// כעת הערכים של A ו-B הוחלפו`,
    explanation: 'אי אפשר פשוט לכתוב A=B ואז B=A, כי הפקודה הראשונה דורסת את הערך המקורי של A. חייבים "לשמור בצד" את הערך במשתנה זמני.'
  },
  {
    id: 'p8',
    title: 'לוגיקה בוליאנית (AND/OR/NOT)',
    category: 'pseudo',
    description: 'פעולות לוגיות המחזירות אמת או שקר, משמשות בתנאים מורכבים.',
    codeExample: `אם (A > 5) וגם (B < 3):
   // יתבצע רק אם שני התנאים נכונים
אם (A > 5) או (B < 3):
   // יתבצע אם לפחות אחד מהם נכון`,
    explanation: 'AND (וגם) דורש שכולם יהיו אמת. OR (או) מסתפק באחד. NOT (לא) הופך את התוצאה.'
  },
  {
    id: 'p9',
    title: 'לולאה מקוננת (Nested Loop)',
    category: 'pseudo',
    description: 'לולאה בתוך לולאה. הלולאה הפנימית רצה במלואה עבור כל סיבוב של הלולאה החיצונית.',
    codeExample: `עבור I מ-1 עד 3:
   עבור J מ-1 עד 3:
      הדפס I,J
// יודפס: 1,1 | 1,2 | 1,3 | 2,1 ...`,
    explanation: 'מספר הפעולות הכולל הוא מכפלת מספר האיטרציות. כאן: 3 כפול 3 = 9 ריצות סה"כ.'
  },
  {
    id: 'p10',
    title: 'טבלת מעקב (Trace Table)',
    category: 'pseudo',
    description: 'שיטה ידנית למעקב אחרי השתנות המשתנים בקוד, שורה אחר שורה.',
    codeExample: `קוד:
1. X=2
2. X=X+3
טבלה:
שורה | X
----------
1    | 2
2    | 5`,
    explanation: 'במבחן מחשבון קרב, חובה לצייר טבלת מעקב כדי לא ללכת לאיבוד עם משתנים שמשתנים הרבה פעמים.'
  },
  {
    id: 'p11',
    title: 'פונקציה (Function)',
    category: 'pseudo',
    description: 'בלוק קוד בעל שם המבצע משימה ספציפית וניתן לקרוא לו ממקומות שונים.',
    codeExample: `פונקציה חשב_סכום(A, B):
    החזר A + B

...
תוצאה = חשב_סכום(5, 3) // תוצאה תהיה 8`,
    explanation: 'פונקציות עוזרות לארגן את הקוד ולמנוע חזרות. הן מקבלות "פרמטרים" (קלט) ומחזירות "ערך החזרה" (פלט).'
  },
  {
    id: 'p12',
    title: 'מחרוזת (String)',
    category: 'pseudo',
    description: 'רצף של תווים (אותיות, מספרים, סימנים) המיוצג כטקסט.',
    codeExample: `שם = "דני"
הודעה = "שלום " + שם
// הודעה תכיל: "שלום דני"
אורך = אורך_של(שם) // 3`,
    explanation: 'בניגוד למספרים, במחרוזות פעולת ה-"+" בדרך כלל משרשרת (מחברת) את הטקסטים זה לזה.'
  },
  {
    id: 'p13',
    title: 'מטריצה / מערך דו-ממדי (2D Array)',
    category: 'pseudo',
    description: 'טבלה של נתונים עם שורות ועמודות.',
    codeExample: `M = [[1, 2, 3], 
     [4, 5, 6], 
     [7, 8, 9]]
// גישה לאיבר בשורה 1, עמודה 2 (המספר 6)
X = M[1][2] 
// מעבר על האלכסון הראשי:
עבור I מ-0 עד 2:
   הדפס M[I][I] // 1, 5, 9`,
    explanation: 'משמש לייצוג לוחות משחק, תמונות, או טבלאות נתונים. דורש בדרך כלל לולאות מקוננות.',
    visualSvg: `<svg viewBox="0 0 200 120" class="w-full h-full">
      <rect x="20" y="20" width="30" height="30" fill="#fff" stroke="#334155"/> <text x="35" y="40" text-anchor="middle" font-size="10">0,0</text>
      <rect x="50" y="20" width="30" height="30" fill="#fff" stroke="#334155"/> <text x="65" y="40" text-anchor="middle" font-size="10">0,1</text>
      <rect x="80" y="20" width="30" height="30" fill="#fff" stroke="#334155"/> <text x="95" y="40" text-anchor="middle" font-size="10">0,2</text>
      
      <rect x="20" y="50" width="30" height="30" fill="#fff" stroke="#334155"/> <text x="35" y="70" text-anchor="middle" font-size="10">1,0</text>
      <rect x="50" y="50" width="30" height="30" fill="#bfdbfe" stroke="#334155"/> <text x="65" y="70" text-anchor="middle" font-size="10">1,1</text>
      <rect x="80" y="50" width="30" height="30" fill="#fff" stroke="#334155"/> <text x="95" y="70" text-anchor="middle" font-size="10">1,2</text>
      
      <rect x="20" y="80" width="30" height="30" fill="#fff" stroke="#334155"/> <text x="35" y="100" text-anchor="middle" font-size="10">2,0</text>
      <rect x="50" y="80" width="30" height="30" fill="#fff" stroke="#334155"/> <text x="65" y="100" text-anchor="middle" font-size="10">2,1</text>
      <rect x="80" y="80" width="30" height="30" fill="#fff" stroke="#334155"/> <text x="95" y="100" text-anchor="middle" font-size="10">2,2</text>
    </svg>`
  },
  {
    id: 'p14',
    title: 'העברה לפי ערך vs ייחוס (Pass by Value/Ref)',
    category: 'pseudo',
    description: 'האם פונקציה מקבלת עותק של המשתנה או את המשתנה המקורי עצמו.',
    codeExample: `פונקציה שנה_ערך(X):
   X = 5

A = 10
שנה_ערך(A)
// אם לפי ערך: A נשאר 10
// אם לפי ייחוס (Reference): A משתנה ל-5`,
    explanation: 'במערכים ואובייקטים, בדרך כלל מעבירים לפי ייחוס (השינוי נשמר). במספרים רגילים, בדרך כלל לפי ערך (השינוי לא נשמר בחוץ).'
  },

  // --- Algorithms (אלגוריתמים ומבני נתונים) ---
  {
    id: 'a1',
    title: 'מחסנית (Stack)',
    category: 'algo',
    description: 'מבנה נתונים מסוג LIFO (Last In, First Out). האחרון שנכנס הוא הראשון שיוצא.',
    codeExample: `Stack S = []
Push(S, 1) // S: [1]
Push(S, 2) // S: [1, 2]
X = Pop(S) // X=2, S: [1]`,
    explanation: 'דמיינו ערימה של צלחות. תמיד מורידים את הצלחת העליונה (זו שהונחה אחרונה).',
    visualSvg: `<svg viewBox="0 0 200 120" class="w-full h-full">
      <defs>
        <marker id="arrow-stack" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#16a34a" />
        </marker>
        <marker id="arrow-stack-out" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#dc2626" />
        </marker>
      </defs>
      <!-- Container -->
      <path d="M 60 20 L 60 110 L 140 110 L 140 20" stroke="#334155" stroke-width="3" fill="none"/>
      
      <!-- Items -->
      <rect x="65" y="85" width="70" height="20" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
      <rect x="65" y="60" width="70" height="20" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
      
      <!-- Top Item -->
      <rect x="65" y="35" width="70" height="20" rx="4" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
      
      <text x="150" y="45" font-size="12" fill="#16a34a" font-weight="bold">Push</text>
      <path d="M 170 30 L 145 40" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-stack)"/>
      
      <text x="30" y="45" font-size="12" fill="#dc2626" font-weight="bold">Pop</text>
      <path d="M 55 40 L 30 30" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-stack-out)"/>
    </svg>`
  },
  {
    id: 'a2',
    title: 'תור (Queue)',
    category: 'algo',
    description: 'מבנה נתונים מסוג FIFO (First In, First Out). הראשון שנכנס הוא הראשון שיוצא.',
    codeExample: `Queue Q = []
Enqueue(Q, 1) // Q: [1]
Enqueue(Q, 2) // Q: [1, 2]
X = Dequeue(Q) // X=1, Q: [2]`,
    explanation: 'בדיוק כמו תור בסופר. מי שהגיע ראשון - יוצא ראשון.',
    visualSvg: `<svg viewBox="0 0 300 80" class="w-full h-full">
       <defs>
        <marker id="arrow-q" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
        </marker>
       </defs>
       <!-- Items -->
       <rect x="60" y="30" width="40" height="40" rx="4" fill="#bae6fd" stroke="#0ea5e9"/>
       <text x="80" y="55" text-anchor="middle" font-weight="bold" fill="#0369a1">1</text>
       
       <rect x="105" y="30" width="40" height="40" rx="4" fill="#bae6fd" stroke="#0ea5e9"/>
       <text x="125" y="55" text-anchor="middle" font-weight="bold" fill="#0369a1">2</text>
       
       <rect x="150" y="30" width="40" height="40" rx="4" fill="#bae6fd" stroke="#0ea5e9"/>
       <text x="170" y="55" text-anchor="middle" font-weight="bold" fill="#0369a1">3</text>
       
       <!-- In / Out -->
       <text x="25" y="55" font-size="12" fill="#ef4444" font-weight="bold">OUT</text>
       <path d="M 55 50 L 35 50" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-q)"/>
       
       <text x="245" y="55" font-size="12" fill="#22c55e" font-weight="bold">IN</text>
       <path d="M 240 50 L 200 50" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow-q)"/>
    </svg>`
  },
  {
    id: 'a3',
    title: 'רקורסיה (Recursion)',
    category: 'algo',
    description: 'פונקציה הקוראת לעצמה עד שהיא מגיעה לתנאי עצירה.',
    codeExample: `פונקציה F(n):
  אם n == 0 החזר 0
  אחרת, החזר n + F(n-1)

// עבור F(3) נקבל: 3 + 2 + 1 + 0 = 6`,
    explanation: 'רקורסיה מפרקת בעיה גדולה לבעיות קטנות יותר מאותו הסוג. חובה שיהיה תנאי עצירה כדי למנוע לולאה אינסופית.'
  },
  {
    id: 'a4',
    title: 'מיון בועות (Bubble Sort)',
    category: 'algo',
    description: 'אלגוריתם מיון פשוט המחליף זוגות סמוכים אם הם לא בסדר הנכון.',
    codeExample: `מערך: [5, 1, 4]
סיבוב 1: [1, 5, 4] (החלפה בין 5 ל-1)
סיבוב 2: [1, 4, 5] (החלפה בין 5 ל-4)`,
    explanation: 'המספרים "הכבדים" (הגדולים) מבעבעים לסוף המערך בכל איטרציה.'
  },
  {
    id: 'a5',
    title: 'חיפוש בינארי (Binary Search)',
    category: 'algo',
    description: 'שיטה יעילה למציאת ערך ברשימה ממוינת על ידי חציית החיפוש בכל שלב.',
    codeExample: `רשימה: [2, 4, 6, 8, 10, 12, 14]
מחפשים 10:
1. אמצע = 8. 10 > 8, הולכים ימינה.
2. אמצע = 12. 10 < 12, הולכים שמאלה.
3. מצאנו את 10!`,
    explanation: 'עובד רק כשהרשימה מסודרת. מהיר הרבה יותר מלעבור אחד אחד (חיפוש לינארי).'
  },
  {
    id: 'a6',
    title: 'מונה וצובר (Counter & Accumulator)',
    category: 'algo',
    description: 'משתנים נפוצים בלולאות: מונה סופר פעמים (C=C+1), צובר מסכם ערכים (Sum=Sum+X).',
    codeExample: `Count = 0, Sum = 0
עבור כל ציון ברשימה:
   Count = Count + 1
   Sum = Sum + ציון
ממוצע = Sum / Count`,
    explanation: 'המונה משמש לדעת "כמה יש", הצובר משמש לדעת "כמה סה״כ".'
  },
  {
    id: 'a7',
    title: 'עץ בינארי (Binary Tree)',
    category: 'algo',
    description: 'מבנה נתונים היררכי שבו לכל צומת יש עד שני "ילדים" (שמאל וימין).',
    codeExample: `      5 (שורש)
    /   \
   3     8
  / \   /
 1   4 7`,
    explanation: 'משמש רבות לחיפוש ומיון. השורש למעלה, העלים למטה. בעץ חיפוש בינארי, כל מה שמשמאל קטן יותר וכל מה שמימין גדול יותר.',
    visualSvg: `<svg viewBox="0 0 200 120" class="w-full h-full">
      <!-- Edges -->
      <line x1="100" y1="20" x2="60" y2="60" stroke="#94a3b8" stroke-width="2"/>
      <line x1="100" y1="20" x2="140" y2="60" stroke="#94a3b8" stroke-width="2"/>
      <line x1="60" y1="60" x2="40" y2="100" stroke="#94a3b8" stroke-width="2"/>
      <line x1="60" y1="60" x2="80" y2="100" stroke="#94a3b8" stroke-width="2"/>
      
      <!-- Nodes -->
      <circle cx="100" cy="20" r="12" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
      <text x="100" y="23" text-anchor="middle" font-size="10" fill="white" font-weight="bold">5</text>
      
      <circle cx="60" cy="60" r="12" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
      <text x="60" y="63" text-anchor="middle" font-size="10" fill="#9d174d" font-weight="bold">3</text>
      
      <circle cx="140" cy="60" r="12" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
      <text x="140" y="63" text-anchor="middle" font-size="10" fill="#9d174d" font-weight="bold">8</text>
      
      <circle cx="40" cy="100" r="12" fill="#fdf2f8" stroke="#db2777" stroke-width="2"/>
      <text x="40" y="103" text-anchor="middle" font-size="10" fill="#9d174d" font-weight="bold">1</text>
      
      <circle cx="80" cy="100" r="12" fill="#fdf2f8" stroke="#db2777" stroke-width="2"/>
      <text x="80" y="103" text-anchor="middle" font-size="10" fill="#9d174d" font-weight="bold">4</text>
    </svg>`
  },
  {
    id: 'a8',
    title: 'רשימה מקושרת (Linked List)',
    category: 'algo',
    description: 'רצף של חוליות, כאשר כל חוליה מכילה מידע ומצביע לחוליה הבאה.',
    codeExample: `[Data: 5 | Next] -> [Data: 10 | Next] -> NULL`,
    explanation: 'בניגוד למערך, האיברים לא יושבים ברצף בזיכרון. קל להוסיף איברים באמצע, אבל קשה להגיע ישירות לאיבר ה-100 (צריך לעבור את כולם).',
    visualSvg: `<svg viewBox="0 0 300 80" class="w-full h-full">
      <defs>
        <marker id="arrow-link" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#7c3aed" />
        </marker>
      </defs>
      
      <!-- Node 1 -->
      <rect x="20" y="25" width="40" height="30" fill="#ddd6fe" stroke="#7c3aed" stroke-width="2"/>
      <text x="40" y="43" text-anchor="middle" font-weight="bold" fill="#5b21b6">5</text>
      <rect x="60" y="25" width="20" height="30" fill="#8b5cf6" stroke="#7c3aed" stroke-width="2"/>
      <path d="M 80 40 L 110 40" stroke="#7c3aed" stroke-width="2" marker-end="url(#arrow-link)"/>
      
      <!-- Node 2 -->
      <rect x="120" y="25" width="40" height="30" fill="#ddd6fe" stroke="#7c3aed" stroke-width="2"/>
      <text x="140" y="43" text-anchor="middle" font-weight="bold" fill="#5b21b6">10</text>
      <rect x="160" y="25" width="20" height="30" fill="#8b5cf6" stroke="#7c3aed" stroke-width="2"/>
      <path d="M 180 40 L 210 40" stroke="#7c3aed" stroke-width="2" marker-end="url(#arrow-link)"/>
      
      <text x="230" y="45" font-family="monospace" font-weight="bold" fill="#4b5563">NULL</text>
    </svg>`
  },
  {
    id: 'a9',
    title: 'סיבוכיות זמן (Time Complexity / Big O)',
    category: 'algo',
    description: 'דרך למדוד כמה מהיר האלגוריתם ביחס לכמות הקלט (N).',
    codeExample: `O(1) - זמן קבוע (גישה למערך)
O(N) - זמן לינארי (לולאה אחת)
O(N^2) - זמן ריבועי (לולאה בתוך לולאה)`,
    explanation: 'אלגוריתם "יעיל" הוא כזה שהסיבוכיות שלו נמוכה. למשל, עדיף O(log N) על פני O(N).',
    visualSvg: `<svg viewBox="0 0 150 120" class="w-full h-full">
      <!-- Axes -->
      <line x1="20" y1="100" x2="140" y2="100" stroke="#000" stroke-width="1.5"/> <!-- X (N) -->
      <text x="140" y="115" font-size="10">N</text>
      <line x1="20" y1="100" x2="20" y2="10" stroke="#000" stroke-width="1.5"/> <!-- Y (Time) -->
      <text x="5" y="15" font-size="10">T</text>
      
      <!-- Curves -->
      <path d="M 20 100 Q 60 90 100 10" stroke="#ef4444" stroke-width="2" fill="none"/>
      <text x="105" y="20" font-size="10" fill="#ef4444" font-weight="bold">O(N²)</text>
      
      <path d="M 20 100 L 120 40" stroke="#3b82f6" stroke-width="2" fill="none"/> 
      <text x="125" y="40" font-size="10" fill="#3b82f6" font-weight="bold">O(N)</text>
      
      <path d="M 20 80 L 130 80" stroke="#22c55e" stroke-width="2" fill="none"/>
      <text x="135" y="80" font-size="10" fill="#22c55e" font-weight="bold">O(1)</text>
    </svg>`
  },
  {
    id: 'a10',
    title: 'מילון / מפה (Hash Map / Dictionary)',
    category: 'algo',
    description: 'מבנה נתונים הממפה מפתח (Key) לערך (Value) ומאפשר חיפוש מהיר.',
    codeExample: `Grades = {} // מילון ריק
Grades["Danny"] = 90
Grades["Sarah"] = 100
// חיפוש מהיר O(1):
ציון_שרה = Grades["Sarah"]`,
    explanation: 'יעיל מאוד כשרוצים למצוא מידע לפי "שם" ולא לפי מיקום סידורי (כמו במערך).',
    visualSvg: `<svg viewBox="0 0 250 100" class="w-full h-full">
      <defs>
        <marker id="arrow-map" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
        </marker>
      </defs>
      <rect x="20" y="20" width="60" height="30" fill="#fef3c7" stroke="#f59e0b"/>
      <text x="50" y="40" text-anchor="middle" font-size="12" fill="#92400e">"Danny"</text>
      
      <rect x="20" y="60" width="60" height="30" fill="#fef3c7" stroke="#f59e0b"/>
      <text x="50" y="80" text-anchor="middle" font-size="12" fill="#92400e">"Sarah"</text>
      
      <path d="M 80 35 L 140 35" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow-map)"/>
      <path d="M 80 75 L 140 75" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow-map)"/>
      
      <circle cx="160" cy="35" r="15" fill="#fde68a" stroke="#d97706"/>
      <text x="160" y="39" text-anchor="middle" font-weight="bold" fill="#b45309">90</text>
      
      <circle cx="160" cy="75" r="15" fill="#fde68a" stroke="#d97706"/>
      <text x="160" y="79" text-anchor="middle" font-weight="bold" fill="#b45309">100</text>
    </svg>`
  },
  {
    id: 'a11',
    title: 'קבוצה (Set)',
    category: 'algo',
    description: 'אוסף של איברים ייחודיים ללא כפילויות וללא סדר חשיבות.',
    codeExample: `S = {1, 2, 2, 3}
// S יכיל בפועל: {1, 2, 3} (ה-2 הכפול נמחק)
האם 2 קיים ב-S? -> אמת
הוסף 4 ל-S -> {1, 2, 3, 4}`,
    explanation: 'מצוין לסינון כפילויות ולבדיקת שייכות מהירה.'
  },

  // --- Logic (לוגיקה וחשיבה) ---
  {
    id: 'l1',
    title: 'סדרת הפרשים',
    category: 'logic',
    description: 'סדרה שבה ההפרש בין האיברים הוא קבוע או משתנה בחוקיות מסוימת.',
    codeExample: `2, 5, 8, 11... (הפרש קבוע +3)
2, 4, 8, 14... (הפרשים: +2, +4, +6...)`,
    explanation: 'תמיד חשב את ההפרש בין כל זוג מספרים סמוך כדי למצוא את החוקיות.'
  },
  {
    id: 'l2',
    title: 'סדרת דילוגים',
    category: 'logic',
    description: 'שתי סדרות שונות המשולבות זו בזו לסירוגין.',
    codeExample: `10, 2, 20, 4, 30, 6...
סדרה א (מקומות אי זוגיים): 10, 20, 30...
סדרה ב (מקומות זוגיים): 2, 4, 6...`,
    explanation: 'אם הסדרה נראית ארוכה ולא הגיונית, נסה לבדוק את האיברים במקומות הזוגיים והאי-זוגיים בנפרד.'
  },
  {
    id: 'l3',
    title: 'סדרה הנדסית (Geometric)',
    category: 'logic',
    description: 'סדרה בה כל איבר מתקבל על ידי הכפלת האיבר הקודם במספר קבוע.',
    codeExample: `3, 6, 12, 24, 48...
כאן כופלים כל פעם ב-2.`,
    explanation: 'שים לב אם המספרים גדלים בקצב מהיר מאוד - זה רמז לכפל ולא לחיבור.'
  },
  {
    id: 'l4',
    title: 'סדרת פיבונאצ׳י (Fibonacci)',
    category: 'logic',
    description: 'סדרה שבה כל איבר הוא סכום שני האיברים הקודמים לו.',
    codeExample: `1, 1, 2, 3, 5, 8, 13...
1+1=2
1+2=3
2+3=5`,
    explanation: 'דפוס נפוץ מאוד במבחני לוגיקה. תמיד בדוק אם איבר הוא סכום קודמיו.'
  },
  {
    id: 'l5',
    title: 'היקש לוגי (Syllogism)',
    category: 'logic',
    description: 'הסקת מסקנה משתי טענות או יותר.',
    codeExample: `טענה א: כל העננים לבנים.
טענה ב: דני הוא ענן.
מסקנה: דני הוא לבן.`,
    explanation: 'במבחנים, הטענות עשויות להיות דמיוניות ("כל החרגולים סגולים"). התמקד בלוגיקה הפורמלית ולא באמת המציאותית.'
  },
  {
    id: 'l6',
    title: 'סדרה משולבת פעולות',
    category: 'logic',
    description: 'סדרה שבה המעבר בין איברים מערב יותר מפעולה מתמטית אחת.',
    codeExample: `2, 5, 11, 23, 47...
החוקיות: כפול 2 ועוד 1.
2*2+1 = 5
5*2+1 = 11`,
    explanation: 'לפעמים המספרים לא מסתדרים רק עם חיבור או כפל. נסה לשלב: "כפול X ועוד Y".'
  },
  {
    id: 'l7',
    title: 'מטריצות צורניות (Visual Matrices)',
    category: 'logic',
    description: 'טבלה של צורות (למשל 3x3) שבה יש למצוא את הצורה החסרה לפי חוקיות השורות והטורים.',
    codeExample: `[O]  [OO]  [OOO]
[X]  [XX]  [XXX]
[*]  [**]   ?
התשובה: [***] (כמות הצורות גדלה ב-1)`,
    explanation: 'חפש חוקיות בשורות (שמאל לימין) ובטורים (למעלה למטה). החוקיות יכולה להיות חיבור צורות, חיסור, או תנועה.'
  },
  {
    id: 'l8',
    title: 'שער XOR (Exclusive OR)',
    category: 'logic',
    description: 'פעולה לוגית שמחזירה אמת רק אם בדיוק אחד מהקלטים הוא אמת (ולא שניהם).',
    codeExample: `0 XOR 0 = 0
0 XOR 1 = 1
1 XOR 0 = 1
1 XOR 1 = 0 (זה ההבדל מ-OR רגיל)`,
    explanation: 'שימושי מאוד בהצפנה ובחידות לוגיות של "או זה או זה אבל לא שניהם".'
  },

  // --- OOP (מונחה עצמים) ---
  {
    id: 'o1',
    title: 'מחלקה ואובייקט (Class & Object)',
    category: 'oop',
    description: 'מחלקה היא תבנית (מתכון), אובייקט הוא המופע שנוצר ממנה (העוגה).',
    codeExample: `Class Dog { ... }
Dog d1 = new Dog() // d1 הוא אובייקט מסוג Dog`,
    explanation: 'המחלקה מגדירה איזה תכונות ופעולות יהיו, האובייקט מכיל את הנתונים האמיתיים בזיכרון.'
  },
  {
    id: 'o2',
    title: 'ירושה (Inheritance)',
    category: 'oop',
    description: 'מחלקה יכולה לרשת תכונות והתנהגות ממחלקה אחרת.',
    codeExample: `Class Animal { eat() }
Class Dog extends Animal { bark() }
// Dog יכול לעשות גם eat וגם bark`,
    explanation: 'מאפשר שימוש חוזר בקוד ומונע שכפול (DRY - Don\'t Repeat Yourself).'
  },
  {
    id: 'o3',
    title: 'פולימורפיזם (Polymorphism)',
    category: 'oop',
    description: 'היכולת של אובייקטים מסוגים שונים להגיב לאותה פקודה בצורה שונה.',
    codeExample: `Animal a = new Dog()
a.makeSound() // ינבח
Animal b = new Cat()
b.makeSound() // יילל`,
    explanation: 'ריבוי צורות. למרות שהמשתנה הוא מסוג "חיה", ההתנהגות נקבעת לפי הסוג האמיתי שנוצר (כלב או חתול).'
  },
  {
    id: 'o4',
    title: 'כימוס (Encapsulation)',
    category: 'oop',
    description: 'הסתרת המידע הפנימי של האובייקט וחשיפה רק של מה שנחוץ החוצה.',
    codeExample: `private int password;
public void setPassword(int p) { ... }`,
    explanation: 'שימוש ב-Private מגן על המשתנים משינוי לא רצוי מבחוץ. הגישה נעשית דרך פונקציות (Getters/Setters).'
  },
  {
    id: 'o5',
    title: 'בנאי (Constructor)',
    category: 'oop',
    description: 'פונקציה מיוחדת שרצה באופן אוטומטי כשיוצרים אובייקט חדש.',
    codeExample: `Class Person {
   Person(name) { 
      this.name = name 
   }
}
p = new Person("Moshe") // הבנאי נקרא כאן`,
    explanation: 'הבנאי משמש בדרך כלל לאתחול הערכים הראשוניים של האובייקט.'
  },
  {
    id: 'o6',
    title: 'משתנה סטטי (Static)',
    category: 'oop',
    description: 'משתנה ששייך למחלקה כולה ולא לאובייקט ספציפי.',
    codeExample: `Class User {
   static count = 0
   User() { count++ }
}
// count יספור כמה משתמשים נוצרו סה"כ`,
    explanation: 'משתנה סטטי הוא משותף לכל האובייקטים. אם משנים אותו במקום אחד, הוא משתנה עבור כולם.'
  },
  {
    id: 'o7',
    title: 'ממשק (Interface)',
    category: 'oop',
    description: 'חוזה שמגדיר איזה פעולות מחלקה חייבת לממש, בלי לכתוב את הקוד עצמו.',
    codeExample: `Interface Flyable {
   void fly();
}
Class Bird implements Flyable {
   void fly() { ... } // חייב לממש את הפונקציה
}`,
    explanation: 'הממשק מגדיר "מה" עושים, והמחלקה שמממשת אותו מגדירה "איך" עושים את זה.'
  },
  {
    id: 'o8',
    title: 'מחלקה מופשטת (Abstract Class)',
    category: 'oop',
    description: 'מחלקה שלא ניתן ליצור ממנה אובייקטים ישירות, ומשמשת כבסיס לירושה.',
    codeExample: `Abstract Class Shape { ... }
Shape s = new Shape() // שגיאה!
class Circle extends Shape { ... } // תקין`,
    explanation: 'משתמשים בזה כשרוצים להגדיר תכונות משותפות לכל הצורות, אבל "צורה" היא מושג כללי מדי מכדי להיות אובייקט בפני עצמו.'
  },
  {
    id: 'o9',
    title: 'העמסה (Overloading)',
    category: 'oop',
    description: 'יצירת מספר פונקציות באותו שם, אך עם פרמטרים שונים.',
    codeExample: `Class Calculator {
   func add(a, b) { return a+b }
   func add(a, b, c) { return a+b+c }
}
calc.add(2,3) // קורא לראשונה
calc.add(2,3,4) // קורא לשנייה`,
    explanation: 'הקומפיילר יודע לאיזו פונקציה לגשת לפי כמות וסוג הפרמטרים שנשלחו.'
  },
  {
    id: 'o10',
    title: 'דריסה (Overriding)',
    category: 'oop',
    description: 'כתיבה מחדש של פונקציה שהתקבלה בירושה ממחלקת האב.',
    codeExample: `Class Animal { 
   func sound() { print "Silence" } 
}
Class Dog extends Animal {
   // דריסה של הפונקציה המקורית
   func sound() { print "Bark" } 
}`,
    explanation: 'מאפשר למחלקת הבן להתנהג בצורה ספציפית שונה ממחלקת האב.'
  }
];