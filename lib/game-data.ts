export const TRACKS = {
  sql: {
    name: 'SQL',
    accent: '#67e8f9',
    description: 'Query data, filter records, and learn relational logic.',
    templates: [
      { concept: 'SELECT', difficulty: 'Beginner', mission: 'Fetch the exact columns you need.', lesson: 'SELECT chooses the columns you want to display. FROM tells SQL which table to read from.', challenge: 'Write a SQL query to select first_name and email from the users table.', answer: 'SELECT first_name, email FROM users;', hint: 'Start with SELECT, then list the columns, then FROM users.' },
      { concept: 'WHERE', difficulty: 'Beginner', mission: 'Filter rows by condition.', lesson: 'WHERE limits results to rows matching a test such as age > 25 or city = "Paris".', challenge: 'Select all users with age greater than 25.', answer: 'SELECT * FROM users WHERE age > 25;', hint: 'Add a WHERE clause after FROM.' },
      { concept: 'ORDER BY', difficulty: 'Starter', mission: 'Sort the output clearly.', lesson: 'ORDER BY arranges rows in a sequence. ASC sorts smallest to largest; DESC sorts reverse.', challenge: 'Show all users ordered by age from youngest to oldest.', answer: 'SELECT * FROM users ORDER BY age ASC;', hint: 'Use ORDER BY age ASC.' },
      { concept: 'LIMIT', difficulty: 'Starter', mission: 'Keep output concise.', lesson: 'LIMIT restricts the number of rows returned to the first N rows.', challenge: 'Return only the first 5 users from the users table.', answer: 'SELECT * FROM users LIMIT 5;', hint: 'Use LIMIT 5 at the end of the query.' },
      { concept: 'COUNT', difficulty: 'Intermediate', mission: 'Summarize rows with aggregate functions.', lesson: 'COUNT(*) counts all rows. Aggregates reduce many rows into a single result.', challenge: 'Count all users in the users table.', answer: 'SELECT COUNT(*) FROM users;', hint: 'Use COUNT(*) and FROM users.' },
      { concept: 'JOIN', difficulty: 'Intermediate', mission: 'Combine tables using related keys.', lesson: 'JOIN links rows from two tables when a key matches, such as customer_id = id.', challenge: 'Show each order with the matching customer name.', answer: 'SELECT o.id, c.name FROM orders o JOIN customers c ON o.customer_id = c.id;', hint: 'Use JOIN and match the customer_id with c.id.' },
      { concept: 'GROUP BY', difficulty: 'Intermediate', mission: 'Group rows before summarizing them.', lesson: 'GROUP BY creates sets of matching rows so aggregation can be applied per group.', challenge: 'Count orders per customer_id.', answer: 'SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id;', hint: 'Group by customer_id and then count the rows in each group.' },
      { concept: 'CASE', difficulty: 'Intermediate', mission: 'Add custom conditions to your query.', lesson: 'CASE creates conditional logic inside a query result.', challenge: 'Return Adult when age >= 18, otherwise Minor.', answer: "SELECT name, CASE WHEN age >= 18 THEN 'Adult' ELSE 'Minor' END AS status FROM users;", hint: 'Use CASE WHEN ... THEN ... ELSE ... END.' },
      { concept: 'DISTINCT', difficulty: 'Starter', mission: 'Remove duplicate output.', lesson: 'DISTINCT removes repeated rows so only unique values remain.', challenge: 'List unique cities from the users table.', answer: 'SELECT DISTINCT city FROM users;', hint: 'Use DISTINCT before city.' },
      { concept: 'NULL', difficulty: 'Intermediate', mission: 'Handle missing values safely.', lesson: 'NULL means no value. Use IS NULL to check for missing data.', challenge: 'Find users with no phone number.', answer: 'SELECT * FROM users WHERE phone IS NULL;', hint: 'Use IS NULL to check for missing values.' },
      { concept: 'AND', difficulty: 'Intermediate', mission: 'Require multiple conditions.', lesson: 'AND keeps rows only when all conditions are true.', challenge: 'Find users who are older than 18 and live in London.', answer: "SELECT * FROM users WHERE age > 18 AND city = 'London';", hint: 'Use WHERE age > 18 AND city = \"London\".' },
      { concept: 'OR', difficulty: 'Intermediate', mission: 'Match any given condition.', lesson: 'OR keeps rows when at least one condition is true.', challenge: 'Find users who are either from Paris or Berlin.', answer: "SELECT * FROM users WHERE city = 'Paris' OR city = 'Berlin';", hint: 'Use OR to match either city.' }
    ]
  },

  excel: {
    name: 'Excel',
    accent: '#a78bfa',
    description: 'Build formulas, logic, and data-cleaning skills.',
    templates: [
      { concept: 'SUM', difficulty: 'Beginner', mission: 'Add values in a range.', lesson: 'SUM adds all numeric values in a range.', challenge: 'In Excel, sum the values in B2:B10.', answer: '=SUM(B2:B10)', hint: 'Use =SUM(B2:B10).' },
      { concept: 'AVERAGE', difficulty: 'Beginner', mission: 'Find the mean value.', lesson: 'AVERAGE calculates the arithmetic mean of a selected range.', challenge: 'Calculate the average of A1:A12.', answer: '=AVERAGE(A1:A12)', hint: 'Use =AVERAGE(A1:A12).' },
      { concept: 'IF', difficulty: 'Beginner', mission: 'Use decision logic.', lesson: 'IF checks a condition and returns one value if true and another if false.', challenge: 'Return Pass when B2 is greater than 70, else Fail.', answer: '=IF(B2>70,"Pass","Fail")', hint: 'Use =IF(B2>70,"Pass","Fail").' },
      { concept: 'MAX', difficulty: 'Starter', mission: 'Find the highest value.', lesson: 'MAX returns the largest number in a range.', challenge: 'Return the highest value in C1:C20.', answer: '=MAX(C1:C20)', hint: 'Use =MAX(C1:C20).' },
      { concept: 'MIN', difficulty: 'Starter', mission: 'Find the lowest value.', lesson: 'MIN returns the smallest number in a range.', challenge: 'Return the lowest value in D2:D18.', answer: '=MIN(D2:D18)', hint: 'Use =MIN(D2:D18).' },
      { concept: 'COUNTIF', difficulty: 'Intermediate', mission: 'Count matching entries.', lesson: 'COUNTIF counts cells that match a specific rule or condition.', challenge: 'Count cells in A2:A20 that are greater than 100.', answer: '=COUNTIF(A2:A20,">100")', hint: 'Use COUNTIF with criteria >100.' },
      { concept: 'SUMIF', difficulty: 'Intermediate', mission: 'Total values that match a rule.', lesson: 'SUMIF adds values only when the related condition is true.', challenge: 'Sum values in B2:B20 where A2:A20 is greater than 10.', answer: '=SUMIF(A2:A20,">10",B2:B20)', hint: 'Use the criterion range, then the sum range.' },
      { concept: 'VLOOKUP', difficulty: 'Intermediate', mission: 'Look up related data from a table.', lesson: 'VLOOKUP searches a table and returns a value in a later column from the same row.', challenge: 'Look up the price from A2:C10 using the product in E2.', answer: '=VLOOKUP(E2,A2:C10,3,FALSE)', hint: 'Use the product lookup and return the third column.' },
      { concept: 'INDEX/MATCH', difficulty: 'Advanced', mission: 'Use flexible lookups.', lesson: 'INDEX/MATCH is a more flexible method for finding values in a table.', challenge: 'Return the sales number for the item in E2 from A2:B20.', answer: '=INDEX(B2:B20,MATCH(E2,A2:A20,0))', hint: 'MATCH finds the row number and INDEX returns the value.' },
      { concept: 'CONCAT', difficulty: 'Intermediate', mission: 'Join text from multiple cells.', lesson: 'CONCAT merges text values from different cells into one string.', challenge: 'Combine the first name in A2 and last name in B2 with a space.', answer: '=CONCAT(A2," ",B2)', hint: 'Add a space inside double quotes.' },
      { concept: 'LEFT', difficulty: 'Starter', mission: 'Take a text prefix.', lesson: 'LEFT returns the first N characters from a text string.', challenge: 'Return the first 3 letters from A2.', answer: '=LEFT(A2,3)', hint: 'Use LEFT with the cell and number of characters.' },
      { concept: 'RIGHT', difficulty: 'Starter', mission: 'Take a text suffix.', lesson: 'RIGHT returns the last N characters from a text string.', challenge: 'Return the last 4 letters from B2.', answer: '=RIGHT(B2,4)', hint: 'Use RIGHT(B2,4).' }
    ]
  },

  powershell: {
    name: 'PowerShell',
    accent: '#f472b6',
    description: 'Learn automation, file handling, and scripting essentials.',
    templates: [
      { concept: 'Get-ChildItem', difficulty: 'Beginner', mission: 'List files and folders.', lesson: 'Get-ChildItem shows items in a directory, similar to ls or dir.', challenge: 'List files and folders in the current directory.', answer: 'Get-ChildItem', hint: 'Run Get-ChildItem.' },
      { concept: 'Get-Process', difficulty: 'Beginner', mission: 'Inspect running processes.', lesson: 'Get-Process displays active processes and resource usage.', challenge: 'Show the current running processes.', answer: 'Get-Process', hint: 'Use Get-Process.' },
      { concept: 'Where-Object', difficulty: 'Beginner', mission: 'Filter output using conditions.', lesson: 'Where-Object filters pipeline data based on a condition.', challenge: 'List only processes using more than 100 MB of memory.', answer: 'Get-Process | Where-Object { $_.WorkingSet -gt 100MB }', hint: 'Pipe the output into Where-Object and compare WorkingSet.' },
      { concept: 'Sort-Object', difficulty: 'Starter', mission: 'Sort data into a useful order.', lesson: 'Sort-Object reorders objects by a property such as size or name.', challenge: 'Sort files by size in descending order.', answer: 'Get-ChildItem | Sort-Object Length -Descending', hint: 'Use Sort-Object Length -Descending.' },
      { concept: 'New-Item', difficulty: 'Starter', mission: 'Create a file or folder.', lesson: 'New-Item creates files, folders, and other system items.', challenge: 'Create a text file called notes.txt in the current folder.', answer: 'New-Item -Path .\\\\notes.txt -ItemType File', hint: 'Use New-Item with -ItemType File.' },
      { concept: 'Set-Content', difficulty: 'Intermediate', mission: 'Write content to a file.', lesson: 'Set-Content writes data to a file.', challenge: 'Write Hello Skill Quest to hello.txt.', answer: "Set-Content -Path .\\\\hello.txt -Value 'Hello Skill Quest'", hint: 'Use Set-Content with -Value.' },
      { concept: 'Get-Content', difficulty: 'Intermediate', mission: 'Read a file’s contents.', lesson: 'Get-Content reads the contents of a file.', challenge: 'Display the contents of hello.txt.', answer: 'Get-Content .\\\\hello.txt', hint: 'Run Get-Content against the file path.' },
      { concept: 'ForEach-Object', difficulty: 'Intermediate', mission: 'Apply logic to each item in a list.', lesson: 'ForEach-Object runs a block for each item in the pipeline.', challenge: 'Display the Name of each file in the current folder.', answer: 'Get-ChildItem | ForEach-Object { $_.Name }', hint: 'Pipe to ForEach-Object and output Name.' },
      { concept: 'Test-Path', difficulty: 'Intermediate', mission: 'Check whether a path exists.', lesson: 'Test-Path returns true if the file or directory exists.', challenge: 'Check whether a folder named logs exists.', answer: 'Test-Path .\\\\logs', hint: 'Use Test-Path with the path to logs.' },
      { concept: 'Select-Object', difficulty: 'Advanced', mission: 'Choose which fields to show.', lesson: 'Select-Object restricts the output to specific properties.', challenge: 'Show only the Name and Length properties of current folder items.', answer: 'Get-ChildItem | Select-Object Name, Length', hint: 'Use Select-Object Name, Length.' },
      { concept: 'If Statement', difficulty: 'Advanced', mission: 'Add conditional scripting logic.', lesson: 'An if statement runs code only when a condition is met.', challenge: 'Write a script that prints File exists when logs exists.', answer: "if (Test-Path '.\\\\logs') { 'File exists' }", hint: 'Use if (Test-Path ...) and print a message inside the block.' },
      { concept: 'Foreach Loop', difficulty: 'Advanced', mission: 'Loop through collections.', lesson: 'A foreach loop processes each item in a collection one by one.', challenge: 'Loop through files and print their names.', answer: 'Get-ChildItem | ForEach-Object { $_.Name }', hint: 'Use Get-ChildItem and ForEach-Object.' }
    ]
  }
} as const;

export type TrackId = keyof typeof TRACKS;
export const MAX_LEVELS = 360;

export type LevelDefinition = {
  id: number;
  concept: string;
  difficulty: string;
  mission: string;
  lesson: string;
  challenge: string;
  answer: string;
  hint: string;
};

export type ProfileProgress = {
  current: number;
  unlocked: number;
  completed: number[];
  xp: number;
  badges: string[];
};

export type Profile = {
  username: string;
  selectedTrack: TrackId;
  progress: Record<TrackId, ProfileProgress>;
};

export const BADGES = [
  { id: 'starter', name: 'Starter', requirement: 5, color: '#67e8f9' },
  { id: 'explorer', name: 'Explorer', requirement: 20, color: '#a78bfa' },
  { id: 'solver', name: 'Solver', requirement: 60, color: '#34d399' },
  { id: 'expert', name: 'Expert', requirement: 120, color: '#fbbf24' },
  { id: 'master', name: 'Master', requirement: 220, color: '#f472b6' },
  { id: 'legend', name: 'Legend', requirement: 320, color: '#f87171' }
] as const;

function generateLevels(trackId: TrackId): LevelDefinition[] {
  const source = TRACKS[trackId].templates;
  const levels: LevelDefinition[] = [];

  for (let i = 1; i <= MAX_LEVELS; i++) {
    const item = source[(i - 1) % source.length];
    const suffix = i > 1 ? ` #${i}` : '';

    levels.push({
      id: i,
      concept: `${item.concept}${suffix}`,
      difficulty: item.difficulty,
      mission: item.mission,
      lesson: item.lesson,
      challenge: `${item.challenge}${i > 1 ? ` (Level ${i})` : ''}`,
      answer: item.answer,
      hint: item.hint
    });
  }

  return levels;
}

export const LEVELS: Record<TrackId, LevelDefinition[]> = {
  sql: generateLevels('sql'),
  excel: generateLevels('excel'),
  powershell: generateLevels('powershell')
};

export const getLevelData = (trackId: TrackId, levelNumber: number) => {
  const safe = Math.min(Math.max(levelNumber, 1), MAX_LEVELS);
  return LEVELS[trackId][safe - 1];
};

export const getTrackProgressPreview = (trackId: TrackId, completed: number[]) => {
  const percentage = Math.round((completed.length / MAX_LEVELS) * 100);
  return { percentage };
};
