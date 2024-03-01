use serde::{Deserialize, Serialize};
use std::{env, error::Error, io, path::PathBuf, process::Command };
use tauri_commands::DOTNET_NEW_COMMAND;

#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;

use crate::tauri_commands;

#[derive(Serialize, Deserialize, Debug)]
struct OutputStruct {
    status: i32,
    stdout: String,
    stderr: String,
}

const APPDATA_KEY: &str = "APPDATA";
const HOME_KEY: &str = "HOME";
const PROJECT_PATH_WIN: &str = "lernsoftwareDP//App";
const PROJECT_PATH_UNIX: &str = "lernsoftwareDP/App";

pub fn get_appdata_dir() -> Result<PathBuf, Box<dyn Error>> {
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

// Helper function to process Command output and serialize it to JSON
pub fn process_output(output: std::process::Output) -> Result<String, String> {
    let result = OutputStruct {
        status: output.status.code().unwrap_or_default(),
        stdout: String::from_utf8_lossy(&output.stdout).to_string(),
        stderr: String::from_utf8_lossy(&output.stderr).to_string(),
    };

    serde_json::to_string(&result).map_err(|e| e.to_string())
}

pub fn create_dotnet_project(appdata_dir: &PathBuf) -> io::Result<()> {
    #[cfg(target_os = "windows")]
    {
        let mut command = Command::new("cmd");
        command.args(&["/C", &format!("cd {} && {}", appdata_dir.display(), DOTNET_NEW_COMMAND)]);
        command.creation_flags(0x08000000); // CREATE_NO_WINDOW
        let status = command.status()?;

        if !status.success() {
            return Err(io::Error::new(io::ErrorKind::Other, "Failed to create .NET project"));
        }
    }

    #[cfg(not(target_os = "windows"))]
    {
        let status = Command::new("sh")
            .arg("-c")
            .arg(&format!("cd {} && {}", appdata_dir.display(), DOTNET_NEW_COMMAND))
            .status()?;

        if !status.success() {
            return Err(io::Error::new(io::ErrorKind::Other, "Failed to create .NET project"));
        }
    }

    Ok(())
}
