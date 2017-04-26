/**
 * Created by Callum on 24/02/2017.
 */
/**
 * Updates the HUD every frame
 * @param game
 * @param HudText
 * @param PC
 * @param enemy
 * @param CurrentFloor
 * @constructor
 */
function UpdateHudElements(game, HudText, PC, enemy, CurrentFloor) {

    HudText.PCHPText.setText("HP = " + PC.PCCURHP + "/" + PC.PCMAXHP);

    HudText.PCSTRText.setText("STR = " + PC.PCSTR);

    HudText.PCPATKText.setText("ATK = " + PC.PCPATK);

    HudText.PCPDEFText.setText("DEF = " + PC.PCPDEF);

    HudText.PCPotsText.setText("Potions: " + PC.PCPots);

    HudText.PCPicksText.setText("Picks: " + PC.PCPicks);

    HudText.PCCursesText.setText("Curses: " + PC.PCCurses);

    if (PC.PicksActive){
        HudText.PCPickActive.alpha = 1;
    }
    else{
        HudText.PCPickActive.alpha = 0;
    }

    if (PC.CursesActive){
        HudText.PCCurseActive.alpha = 1;
    }
    else{
        HudText.PCCurseActive.alpha = 0;
    }

    //Display the stats of your equipment (if they are equipped)
    //Helmet text display

    var HeadPassivesString = "";
    var ChestPassivesString = "";
    var WeaponPassivesString = "";




    if (PC.PCHeadEquip.GotEquip === true) {
        if (PC.PCHeadEquip.Quality === 1){
            HudText.PCHeadEquipText.addColor("#ffffff", 0)
        }
        else if (PC.PCHeadEquip.Quality === 1.5){
            HudText.PCHeadEquipText.addColor("#0063ff", 0)
        }
        else if (PC.PCHeadEquip.Quality === 2){
            HudText.PCHeadEquipText.addColor("#9600ff", 0)
        }
        else if (PC.PCHeadEquip.Quality === 3){
            HudText.PCHeadEquipText.addColor("#ff7f00", 0)
        }
        HeadPassivesString = "";
        if (PC.PCHeadEquip.EquipPassive.length > 0){
            HeadPassivesString = "and ";
            var PassiveStringConcat = "";
            for (i = 0; i < PC.PCHeadEquip.EquipPassive.length; i++){
                PassiveStringConcat = PassiveStringConcat.concat("and " + PC.PCHeadEquip.EquipPassive[i].Passive + " " + PC.PCHeadEquip.EquipPassive[i].PassiveX + "% ");
                HeadPassivesString = PassiveStringConcat;
            }
        }
        else{
            HeadPassivesString = " ";
        }
        HudText.PCHeadEquipText.setText("Your helmet gives you " + PC.PCHeadEquip.PCSTRStat + " STR " + HeadPassivesString);
    }
    else{
        HudText.PCHeadEquipText.setText("You have no helmet equipped.")
    }
    //Chestplate text display
    if (PC.PCChestEquip.GotEquip === true) {
        if (PC.PCChestEquip.Quality === 1){
            HudText.PCChestEquipText.addColor("#ffffff", 0)
        }
        else if (PC.PCChestEquip.Quality === 1.5){
            HudText.PCChestEquipText.addColor("#0063ff", 0)
        }
        else if (PC.PCChestEquip.Quality === 2){
            HudText.PCChestEquipText.addColor("#9600ff", 0)
        }
        else if (PC.PCChestEquip.Quality === 3){
            HudText.PCChestEquipText.addColor("#ff7f00", 0)
        }
        ChestPassivesString = "";
        if (PC.PCChestEquip.EquipPassive.length > 0){
            ChestPassivesString = "and ";
            PassiveStringConcat = "";
            for (i = 0; i < PC.PCChestEquip.EquipPassive.length; i++){
                PassiveStringConcat = PassiveStringConcat.concat("and " + PC.PCChestEquip.EquipPassive[i].Passive + " " + PC.PCChestEquip.EquipPassive[i].PassiveX + "% ");
                ChestPassivesString = PassiveStringConcat;
            }
        }
        else{
            ChestPassivesString = " ";
        }
        HudText.PCChestEquipText.setText("Your chestplate gives you " + PC.PCChestEquip.PCSTRStat + " STR " + ChestPassivesString);
    }
    else{
        HudText.PCChestEquipText.setText("You have no chestplate equipped.")
    }
    //Weapon text display
    if (PC.PCWeaponEquip.GotEquip === true) {
        if (PC.PCWeaponEquip.Quality === 1){
            HudText.PCWeaponEquipText.addColor("#ffffff", 0)
        }
        else if (PC.PCWeaponEquip.Quality === 1.5){
            HudText.PCWeaponEquipText.addColor("#0063ff", 0)
        }
        else if (PC.PCWeaponEquip.Quality === 2){
            HudText.PCWeaponEquipText.addColor("#9600ff", 0)
        }
        else if (PC.PCWeaponEquip.Quality === 3){
            HudText.PCWeaponEquipText.addColor("#ff7f00", 0)
        }
        WeaponPassivesString = "";
        if (PC.PCWeaponEquip.EquipPassive.length > 0){
            WeaponPassivesString = "and ";
            PassiveStringConcat = "";
            for (i = 0; i < PC.PCWeaponEquip.EquipPassive.length; i++){
                PassiveStringConcat = PassiveStringConcat.concat("and " + PC.PCWeaponEquip.EquipPassive[i].Passive + " " + PC.PCWeaponEquip.EquipPassive[i].PassiveX + "% ");
                WeaponPassivesString = PassiveStringConcat;
            }
        }
        else{
            WeaponPassivesString = " ";
        }
        HudText.PCWeaponEquipText.setText("Your weapon gives you " + PC.PCWeaponEquip.PCSTRStat + " STR " + WeaponPassivesString);
    }
    else {
        HudText.PCWeaponEquipText.setText("You have no weapon equipped.")
    }

    HudText.FloorNo.setText("Floor " + CurrentFloor);

    HintToDisplay = hints[Math.floor(Math.random()* hints.length)]

    HudText.HintText.setText(HintToDisplay);
}