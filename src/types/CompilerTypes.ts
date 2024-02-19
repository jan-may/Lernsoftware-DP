export type CompilerResponse = {
  language_name: string;
  compile_output: string;
  message: string;
  status: number;
  stdout: string;
  filteredStdout?: string;
  stderr: string;
  time: number;
};
