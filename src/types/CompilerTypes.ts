export type CompilerResponse = {
  language_name: string;
  path: string;
  status: number;
  stdout: string;
  filteredStdout?: string;
  stderr: string;
  time: number;
};
