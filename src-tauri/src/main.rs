// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::{env, error::Error, fs, io, os::windows::process::CommandExt, path::PathBuf, process::Command };

const APPDATA_KEY: &str = "APPDATA";
const HOME_KEY: &str = "HOME";
const PROJECT_PATH_WIN: &str = "lernsoftwareDP//App";
const PROJECT_PATH_UNIX: &str = "lernsoftwareDP/App";
const PROGRAM_NAME: &str = "Program.cs";
const DOTNET_RUN_COMMAND: &str = "dotnet run --no-restore";
const DOTNET_NEW_COMMAND: &str = "dotnet new console --use-program-main";

#[derive(Serialize, Deserialize, Debug)]

struct MyStruct {
    status: i32,
    stdout: String,
    stderr: String,
}

fn get_appdata_dir() -> Result<PathBuf, Box<dyn Error>> {
    let appdata_dir = if cfg!(target_os = "windows") {
        env::var(APPDATA_KEY)
    } else {
        env::var(HOME_KEY)
    };

    match appdata_dir {
        Ok(dir) => {
            if cfg!(target_os = "windows") {
                Ok(PathBuf::from(dir).join(PROJECT_PATH_WIN))
            } else {
                Ok(PathBuf::from(dir).join(PROJECT_PATH_UNIX))
            }
        }
        Err(e) => Err(Box::new(e)),
    }
}

#[tauri::command]
fn get_dotnet_version() -> String {
    let mut command = Command::new("dotnet");
    command.arg("--version");

    // Set creation flags only on Windows to prevent opening a new window
    if cfg!(target_os = "windows") {
        command.creation_flags(0x08000000); // CREATE_NO_WINDOW
    }

    let output = command.output();

    match output {
        Ok(output) => {
            // Check if the command executed successfully
            if output.status.success() {
                String::from_utf8_lossy(&output.stdout).trim().to_string()
            } else {
                "Bitte installieren Sie ein .NET SDK >= 8".to_string()
            }
        },
        Err(_) => "Bitte installieren Sie ein .NET SDK >= 8".to_string(),
    }
}

fn create_dotnet_project(appdata_dir: &PathBuf) -> io::Result<()> {
    let status = if cfg!(target_os = "windows") {
        Command::new("cmd")
            .args(&[
                "/C",
                &format!("cd {} && {}", appdata_dir.display(), DOTNET_NEW_COMMAND),
            ])
            .creation_flags(0x08000000) // CREATE_NO_WINDOW
            .status()?
    } else {
        Command::new("sh")
            .arg("-c")
            .arg(&format!(
                "cd {} && {}",
                appdata_dir.display(),
                DOTNET_NEW_COMMAND
            ))
            .status()?
    };
    if !status.success() {
        return Err(io::Error::new(
            io::ErrorKind::Other,
            "Failed to create .NET project",
        ));
    }
    Ok(())
}

#[tauri::command]
fn write_file_content(code: &str) -> Result<(), String> {
    let appdata_dir = get_appdata_dir().map_err(|e| e.to_string())?;
    fs::create_dir_all(&appdata_dir).map_err(|e| e.to_string())?;
    let project_exists = appdata_dir.join(PROGRAM_NAME).exists();
    if !project_exists {
        create_dotnet_project(&appdata_dir).map_err(|e| e.to_string())?;
    }
    fs::write(appdata_dir.join(PROGRAM_NAME), code).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn run_prog() -> Result<String, String> {
    let appdata_dir = get_appdata_dir().map_err(|e| e.to_string())?;
    let output = if cfg!(target_os = "windows") {
        Command::new("cmd")
            .args(&[
                "/C",
                &format!("cd {} && {}", appdata_dir.display(), DOTNET_RUN_COMMAND),
            ])
            .creation_flags(0x08000000) // CREATE_NO_WINDOW
            .output()
            .map_err(|e| e.to_string())?
    } else {
        Command::new("sh")
            .arg("-c")
            .arg(&format!(
                "cd {} && {}",
                appdata_dir.display(),
                DOTNET_RUN_COMMAND
            ))
            .output()
            .map_err(|e| e.to_string())?
    };
    let result = MyStruct {
        status: output.status.code().unwrap_or_default(),
        stdout: String::from_utf8_lossy(&output.stdout).to_string(),
        stderr: String::from_utf8_lossy(&output.stderr).to_string(),
    };
    serde_json::to_string(&result).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            write_file_content,
            run_prog,
            get_dotnet_version
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}