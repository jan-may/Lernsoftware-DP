// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod project_utils;
mod tauri_commands;
use tauri_commands::{write_file_content, run_prog, get_dotnet_version, get_dotnet_project_path, delete_dotnet_project};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            write_file_content,
            run_prog,
            get_dotnet_version,
            get_dotnet_project_path,
            delete_dotnet_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}