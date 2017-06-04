/**
 * Created by Callum on 06/04/2017.
 */
/**
 * Simple function that'll activate a potion and will heal the player for a quarter of their maximum health
 * @param PC
 * @param InCombat
 * @constructor
 */
function ActivatePotion(PC, InCombat){
    if(!InCombat.InCombat) {
        if (PC.PCPots > 0) {
            PC.PCCURHP += (PC.PCMAXHP / 4);
            PC.PCPots--;
        }
    }
}

/**
 * Simple function that'll activate a pick which will let players destroy the next wall they walk into
 * @param PC
 * @param InCombat
 * @constructor
 */
function ActivatePick(PC, InCombat){
    if (PC.PCPicks > 0){
        if(!InCombat.InCombat) {
            if (!PC.PicksActive) {
                PC.PicksActive = true;
                PC.PCPicks--;
            }
        }
    }
}


/**
 * Simple function that'll activate a curse which will let players destroy the next enemy they walk into immediately
 * @param PC
 * @param InCombat
 * @constructor
 */
function ActivateCurse(PC, InCombat){
    if (PC.PCCurses > 0){
        if(!InCombat.InCombat) {
            if (!PC.CursesActive) {
                PC.CursesActive = true;
                PC.PCCurses--;
            }
        }
    }
}