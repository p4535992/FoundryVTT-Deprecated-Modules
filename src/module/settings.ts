import { modName } from "./utils.js";

export const ignoredWarnings = "IgnoredWarnings";
export const ignoredModules = "IgnoredModules";
export const resetCheckbox = "ResetCheckbox";

/**
 * A class to handle interacting with Foundry's settings.
 */
export class Settings {
    /**
     * Adds a warning to the list of warnings to ignore
     * @param {number} warningID The ID of the warning
     */
    static ignoreWarning(warningID) {
        if(warningID == null) {
            return;
        }
        let ignored = <any[]>game.settings.get(modName, ignoredWarnings);
        if(ignored == null) {
            ignored = [];
        }
        ignored.push(warningID);
        game.settings.set(modName, ignoredWarnings, ignored);
    }

    /**
     * Adds a module to the list of modules to not check
     */
    static ignoreModule(module) {
        if(module == null) {
            return;
        }
        let ignored = <any[]>game.settings.get(modName, ignoredModules);
        if(ignored == null) {
            ignored = [];
        }
        ignored.push(module);
        game.settings.set(modName, ignoredModules, ignored);
    }

    /**
     * Gets the list of warnings that should be ignored
     */
    static getIgnoredWarnings() {
        return <any[]>game.settings.get(modName, ignoredWarnings) ?? [];
    }

    /**
     * Gets the list of modules that should not be checked
     */
    static getIgnoredModules() {
        return <any[]>game.settings.get(modName, ignoredModules) ?? [];
    }

    /**
     * Removes all modules & warnings from the list of ones that aren't checked
     */
    static resetIgnored() {
        game.settings.set(modName, ignoredWarnings, []);
        game.settings.set(modName, ignoredModules, []);
    }

    static registerSettings() {
        game.settings.register(modName, resetCheckbox, {
            name: "Reset Ignored Warnings",
            hint: "If you've ignored any warnings, checking this and saving will show them again.",
            scope: "world",
            config: true,
            type: Boolean,
            default: false,
            onChange: value => {
                if(value) {
                    this.resetIgnored();
                    game.settings.set(modName, resetCheckbox, false);
                }
            }
        });

        game.settings.register(modName, ignoredWarnings, {
            scope: "world",
            config: false,
            default: []
        });

        game.settings.register(modName, ignoredModules, {
            scope: "world",
            config: false,
            default: []
        });
    }
}
