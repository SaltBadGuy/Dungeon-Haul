/**
 * Created by Callum on 06/04/2017.
 */

function ActivatePotion(PC, InCombat){
    if(!InCombat.InCombat) {
        if (PC.PCPots > 0) {
            PC.PCCURHP += (PC.PCMAXHP / 4);
            PC.PCPots--;
        }
    }
}

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