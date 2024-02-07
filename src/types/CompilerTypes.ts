export type CompilerResponse = {
  memory: number;
  language_name: string;
  compile_output: string;
  message: string;
  status_id: number;
  status_msg: string;
  stdout: string;
  filteredStdout?: string;
  stderr: string;
  time: number;
  wall_time: number;
  wall_time_limit: number;
};
