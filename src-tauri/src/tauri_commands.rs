use std::{ fs, path::PathBuf, process::Command };
use crate::project_utils::{get_appdata_dir, process_output, create_dotnet_project};

#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;

const PROGRAM_NAME: &str = "Program.cs";
const DOTNET_RUN_COMMAND: &str = "dotnet run --no-restore";
pub const DOTNET_NEW_COMMAND: &str = "dotnet new console --use-program-main";

#[tauri::command]
pub fn get_dotnet_project_path() -> Result<String, String> {
    let appdata_dir: PathBuf = get_appdata_dir().map_err(|e| e.to_string())?;
    Ok(appdata_dir.display().to_string())
}

#[tauri::command]
pub fn delete_dotnet_project() -> Result<(), String> {
    let appdata_dir = get_appdata_dir().map_err(|e| e.to_string())?;
    fs::remove_dir_all(&appdata_dir).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn write_file_content(code: &str) -> Result<(), String> {
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
pub fn run_prog() -> Result<String, String> {
    let appdata_dir = get_appdata_dir().map_err(|e| e.to_string())?;

    #[cfg(target_os = "windows")]
    {
        let output = Command::new("cmd")
            .args(&[
                "/C",
                &format!("cd {} && {}", appdata_dir.display(), DOTNET_RUN_COMMAND),
            ])
            .creation_flags(0x08000000) // CREATE_NO_WINDOW
            .output()
            .map_err(|e| e.to_string())?;

        return process_output(output);
    }

    #[cfg(not(target_os = "windows"))]
    {
        let output = Command::new("sh")
            .arg("-c")
            .arg(&format!("cd {} && {}", appdata_dir.display(), DOTNET_RUN_COMMAND))
            .output()
            .map_err(|e| e.to_string())?;

        return process_output(output);
    }
}

#[tauri::command]
pub fn get_dotnet_version() -> String {
    let mut command = Command::new("dotnet");
    command.arg("--version");

    // Set creation flags only on Windows to prevent opening a new window
    #[cfg(target_os = "windows")]
    command.creation_flags(0x08000000); // CREATE_NO_WINDOW

    let output = command.output();

    match output {
        Ok(output) => {
            // Check if the command executed successfully
            if output.status.success() {
                String::from_utf8_lossy(&output.stdout).trim().to_string()
            } else {
                "Bitte installieren Sie ein .NET SDK >= 6".to_string()
            }
        },
        Err(_) => "Bitte installieren Sie ein .NET SDK >= 6".to_string(),
    }
}