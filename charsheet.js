/******************************************************************************
         Generic helper functions (not related to characters)
******************************************************************************/

function isValueElement(element) {
    return element.tagName == "INPUT" || element.tagName == "SELECT" || element.tagName == "TEXTAREA";
}

function getContent(element) {
    if (isValueElement(element)) {
        return element.value;
    }
    else {
        return element.innerHTML;
    }
}

function getContentByID(id) {
    return getContent(document.getElementById(id));
}

function setContent(element, value) {
    if (isValueElement(element)) {
        element.value = value;
    }
    else {
        element.innerHTML = value;
    }
}

function setContentByID(id, value) {
    setContent(document.getElementById(id), value);
}

function createDownloadLink() {
    var link = document.getElementById("downloadlink");
    var file = new Blob([JSON.stringify(charData)], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "mychar.json";
    link.style.display = "";
}

function downloadLinkClicked() {
    var link = document.getElementById("downloadlink");
    link.style.display = "none";
}

function clearTable(table, keepheader) {
    while (table.rows.length > (keepheader ? 1 : 0)) {
        table.deleteRow(1);
    }
}

/******************************************************************************
             Helper functions top get specific DOM elements
******************************************************************************/

function getFociTable() {
    return document.getElementById("foci");
}

function getSkillTable() {
    return document.getElementById("skills");
}

function getGoalTable() {
    return document.getElementById("goals");
}

function getArmorTable() {
    return document.getElementById("armor");
}

function getWeaponTable() {
    return document.getElementById("weapons");
}

function getEquipmentTable() {
    return document.getElementById("equipment");
}

function getCyberwareTable() {
    return document.getElementById("cyberware");
}

function getTechniquesTable() {
    return document.getElementById("techniques");
}

/******************************************************************************
     Character-related helper functions (not using global data directly)
******************************************************************************/

function getXPForLevel(level) {
    if (level < 1) {
        return 0;
    }
    switch (level) {
        case 1: return 0;
        case 2: return 3;
        case 3: return 6;
        case 4: return 12;
        case 5: return 18;
        case 6: return 27;
        case 7: return 39;
        case 8: return 54;
        case 9: return 72;
        case 10: return 93;
        default: return 93 + (level - 10) * 24;
    }
}

function getLevelForXP(xp) {
    var level = 1;
    while (getXPForLevel(level) <= xp) {
        ++level;
    }
    return level - 1;
}

function getModifierForStat(stat) {
    if (stat < 4) {
        return -2;
    }
    else if (stat < 8) {
        return -1;
    }
    else if (stat < 14) {
        return 0;
    }
    else if (stat < 18) {
        return 1;
    }
    else {
        return 2;
    }
}

function getPointsToLevelSkill(newlevel) {
    return newlevel + 1;
}

function canBuySkillLevel(newlevel) {
    switch (newlevel) {
        case 4: return dynData.level >= 9;
        case 3: return dynData.level >= 6;
        case 2: return dynData.level >= 3;
        default: return true;
    }
}

function setPsychicElementsDisplayStyle(display) {
    document.getElementById("psychicstuff").style.display = display;
}

/******************************************************************************
                               Character data
******************************************************************************/

var staticData = {
    "backgrounds": [
        {
            "name": "Barbarian",
            "freeskill": "Survive",
            "quicksills": [
            { "name": "Survive", "rank": 0 },
            { "name": "Notice", "rank": 0 },
            { "type": "Combat", "rank": 0 }
            ],
            "growth": [
            { "stat": "Any", "bonus": 1 },
            { "stat": "Physical", "bonus": 2 },
            { "stat": "Physical", "bonus": 2 },
            { "stat": "Mental", "bonus": 2 },
            { "skill": "Exert", "bonus": 1 },
            { "skill": "Any", "bonus": 1 }
            ],
            "learning": ["Combat", "Connect", "Exert", "Lead", "Notice", "Punch", "Sneak", "Survive"],
            "details": [
            "Standards of barbarism vary when many worlds are capable of interstellar spaceflight, but your hero comes from a savage world of low technology and high violence. Their planet may have survived an all-consuming war, or been deprived of critical materials or energy resources, or simply have been colonized by confirmed Luddites. Other barbarians might be drawn from the oppressed underclasses of advanced worlds or the technologically-degenerate inheritors of some high-tech space station or planetary hab."
            ]
        }
    ],
    "foci": [
        {
            "name": "Alert",
            "type": "normal",
            "details": [
            "You are keenly aware of your surroundings and virtually impossible to take unaware. You have an instinctive alacrity of response that helps you act before less wary persons can think to move.",
            "<b>Level 1</b>: Gain Notice as a bonus skill. You cannot be surprised, nor can others use the Surprise Attack option on you. When you roll initiative, roll twice and take the best result.",
            "<b>Level 2</b>: You always act first in a combat round unless someone else involved is also this Alert."
            ]
        },
        {
            "name": "Armsman",
            "type": "combat",
            "details": [
	        "You have an unusual competence with thrown weapons and melee attacks. This focus’ benefits do not apply to unarmed attacks or projectile weapons. For thrown weapons, you can’t use the benefits of the Armsman focus at the same time as Gunslinger.",
	        "<b>Level 1</b>: Gain Stab as a bonus skill. You can draw or sheath a Stowed melee or thrown weapon as an Instant action. You may add your Stab skill level to a melee or thrown weapon’s damage roll or Shock damage, if any.",
	        "<b>Level 2</b>: Your melee and thrown weapons count as TL4 weapons for the purpose of overcoming advanced armors. Even on a miss with a melee weapon, you do an unmodified 1d4 damage to the target, plus any Shock damage. This bonus damage doesn’t apply to thrown weapons or unarmed attacks."
            ]
        },
        {
            "name": "Assassin",
            "type": "combat",
            "details": [
	        "You are practiced at sudden murder, and have certain advantages in carrying out a surprise attack as described in the rules on page XX.",
	        "<b>Level 1</b>: Gain Sneak as a bonus skill. You can conceal an object no larger than a knife or pistol from anything less invasive than a strip search, including normal TL4 passive weapon detectors. You can draw or produce this object as an Instant action, and your point-blank ranged attacks with it cannot miss the target.",
	        "<b>Level 2</b>: You can take a Move action on the same round as you make an assassination attempt, closing rapidly with a target before you attack. This movement happens too quickly to alert a victim."
            ]
        },
        {
            "name": "Authority",
            "type": "normal",
            "details": [
	        "You have an uncanny kind of charisma about you, one that makes others instinctively follow your instructions and further your causes. At level 1, this is a knack of charm and personal magnetism, while level 2 might suggest latent telepathic influence or transhuman memetic hacking augmentations. Where this focus refers to followers, it means NPCs who have voluntarily chosen to be in your service. PCs never count as followers.",
	        "<b>Level 1</b>: Gain Lead as a bonus skill. Once per day, you can make a request from an NPC who is not openly hostile to you, rolling a Cha/Lead skill check at a difficulty of the NPC's Morale score. If you succeed, they will comply with the request, provided it is not harmful or extremely uncharacteristic.",
	        "<b>Level 2</b>: Those who follow you are fired with confidence. Any NPC being directly led by you gains a Morale bonus equal to your Lead skill and a +1 bonus on all skill checks and hit rolls. Followers will not act against your interests unless under extreme pressure."
            ]
        },
        {
            "name": "Close Combatant",
            "type": "combat",
            "details": [
	        "You've had all too much practice at close-in fighting and desperate struggles with pistol or blade. You're extremely skilled at avoiding injury in melee combat, and at level 2 you can dodge through a melee scrum without fear of being knifed in passing.",
	        "<b>Level 1</b>: Gain any combat skill as a bonus skill. You can use pistol-sized ranged weapons in melee without suffering penalties for the proximity of melee attackers. You ignore Shock damage from melee assailants, even if you're unarmored at the time.",
	        "<b>Level 2</b>: The Shock damage from your melee attacks treats all targets as if they were AC 10. The Fighting Withdrawal combat action is treated as an On Turn action for you and can be performed freely."
            ]
        },
        {
            "name": "Connected",
            "type": "normal",
            "details": [
	        "You’re remarkably gifted at making friends and forging ties with the people around you. Wherever you go, you always seem to know somebody useful to your ends.",
	        "<b>Level 1</b>: Gain Connect as a bonus skill. If you’ve spent at least a week in a not-entirely-hostile location, you’ll have built a web of contacts willing to do favors for you that are no more than mildly illegal. You can call on one favor per game day and the GM decides how far they’ll go for you.",
	        "<b>Level 2</b>: As above. Once per game session, if it’s not entirely implausible, you meet someone you know who is willing to do modest favors for you. You can decide when and where you want to meet this person, but the GM decides who they are and what they can do for you."
            ]
        },
        {
            "name": "Die Hard",
            "type": "combat",
            "details": [
	        "You are surprisingly hard to kill. You can survive injuries or bear up under stresses that would incapacitate a less determined hero.",
	        "<b>Level 1</b>: You gain an extra 2 maximum hit points per level. This bonus applies retroactively if you take this focus after first level. You automatically stabilize if mortally wounded by anything smaller than a Heavy weapon.",
	        "<b>Level 2</b>: The first time each day that you are reduced to zero hit points by an injury, you instead survive with one hit point remaining. This ability can't save you from Heavy weapons or similar trauma."
            ]
        },
        {
            "name": "Diplomat",
            "type": "normal",
            "details": [
	        "You know how to get your way in personal negotiations, and can manipulate the attitudes of those around you. Even so, while smooth words are versatile, they’ll only work if your interlocutor is actually willing to listen to you.",
	        "<b>Level 1</b>: You speak all the languages common to the sector and can learn new ones to a workable level in a week, becoming fluent in a month. Reroll 1s on any skill check related to negotiation or diplomacy.",
	        "<b>Level 2</b>: Once per game session, shift an intelligent NPC’s reaction roll one step closer to friendly if you can talk to them for at least thirty seconds."
            ]
        },
        {
            "name": "Gunslinger",
            "type": "combat",
            "details": [
	        "You have a gift with a gun. While this talent most commonly applies to slugthrowers or energy weapons, it is also applicable to thrown weapons, bows, or other ranged weapons that can be used with the Shoot skill. For thrown weapons, you can’t use the benefits of the Armsman focus at the same time as Gunslinger.",
	        "<b>Level 1</b>: Gain Shoot as a bonus skill. You can draw or holster a Stowed ranged weapon as a free action. You may add your Shoot skill level to a ranged weapon’s damage roll or Shock damage, if any.",
	        "<b>Level 2</b>: You can reload a ranged weapon as an On Turn action if it takes no more than one round to reload. Even on a miss with a Shoot attack, you do an unmodified 1d4 damage."
            ]
        },
        {
            "name": "Hacker",
            "type": "normal",
            "details": [
	        "You have a remarkable fluency with digital security measures and standard encryption methods. You know how to make computerized systems obey you until their automatic failsafes come down on your control.",
	        "<b>Level 1</b>: Gain Program as a bonus skill. When attempting to hack a database or computerized system, roll 3d6 on the skill check and drop the lowest die.",
	        "<b>Level 2</b>: Your hack duration increases from 1d4 plus your Program skill in rounds to that many minutes. You have an instinctive understanding of the tech; you never need to learn the data protocols for a strange system and are always treated as familiar with it."
            ]
        },
        {
            "name": "Healer",
            "type": "normal",
            "details": [
	        "Healing comes naturally to you, and you’re particularly gifted at preventing the quick bleed-out of wounded allies and comrades.",
	        "<b>Level 1</b>: Gain Heal as a bonus skill. You may attempt to stabilize one adjacent person per round as an On Turn action. When rolling Heal skill checks, roll 3d6 and drop the lowest die.",
	        "<b>Level 2</b>: Stims or other technological healing devices applied by you heal twice as many hit points as normal. Using only basic medical supplies, you can heal 1d6+Heal skill hit points of damage to every injured or wounded person in your group with ten minutes of first aid spread among them. Such healing can be applied to a given target only once per day."
            ]
        },
        {
            "name": "Henchkeeper",
            "type": "normal",
            "details": [
	        "You have an distinct knack for picking up lost souls who willingly do your bidding. You might induce them with promises of money, power, excitement, sex, or some other prize that you may or may not eventually grant. A henchman obtained with this focus will serve in loyal fashion until clearly betrayed or placed in unacceptable danger. Henchmen are never \"important\" people in their society, and are usually marginal sorts, outcasts, the desperate, or other persons with few options. You can use more conventional pay or inducements to acquire additional henchmen, but these extra hirelings are no more loyal or competent than your pay and treatment can purchase.",
            "<b>Level 1</b>: You can acquire henchmen within 24 hours of arriving in a community, assuming anyone is suitable hench material. These henchmen will not fight except to save their own lives, but will escort you on adventures and risk great danger to help you. Most henchmen will be treated as Normal Humans from the Xenobestiary section of the book. You can have one henchmen at a time for every three character levels you have, rounded up. You can release henchmen with no hard feelings at any plausible time and pick them back up later should you be without a current henchman.",
            "<b>Level 2</b>: Your henchmen are remarkably loyal and determined, and will fight for you against anything but clearly overwhelming odds. Whether through natural competence or their devotion to you, they're treated as Normal Soldiers or Skilled Workers from the Xenobestiary section."
            ]
        },
        {
            "name": "Ironhide",
	        "type": "combat",
	        "details": [
	        "Whether through uncanny reflexes, remarkable luck, gengineered skin fibers, or subtle telekinetic shielding, you have natural defenses equivalent to high-quality combat armor. The benefits of this focus don’t stack with armor, though Dexterity modifiers still apply.",
	        "<b>Level 1</b>: You have an innate armor class of 15 plus half your character level, rounded up.",
	        "<b>Level 2</b>: Your abilities are so effective that they render you immune to unarmed attacks or primitive melee weapons as if you wore powered armor."
	        ]
        },
        {
	        "name": "Psychic Training",
	        "type": "psychic",
	        "details": [
	        "You’ve had special training in a particular psychic discipline. You must be a Psychic or have taken the Partial Psychic class option as an Adventurer to pick this focus. In the latter case, you can only take training in the discipline you initially chose as a Partial Psychic. As with most foci, this focus can be taken only once.",
	        "<b>Level 1</b>: Gain any psychic skill as a bonus. If this improves it to level-1 proficiency, choose a free level-1 technique from that discipline. Your maximum Effort increases by one.",
	        "<b>Level 2</b>: When you advance a level, the bonus psychic skill you chose automatically gets one skill point put toward increasing it or purchasing a technique from it. You may save these points for later, if more are required to raise the skill or buy a particular technique. These points are awarded retroactively if you take this focus level later in the game."
	        ]
        },
        {
            "name": "Savage Fray",
	        "type": "combat",
	        "details": [
	        "You are a whirlwind of bloody havoc in melee combat, and can survive being surrounded far better than most combatants.",
	        "<b>Level 1</b>: Gain Stab as a bonus skill. All enemies adjacent to you at the end of your turn whom you have not attacked suffer the Shock damage of your weapon if their armor class is not too high to be affected.",
	        "<b>Level 2</b>: After suffering your first melee hit in a round, any further melee attacks from other assailants automatically miss you. If the attacker who hits you has multiple attacks, they may attempt all of them, but other foes around you simply miss."
	        ]
        },
        {
	        "name": "Shocking Assault",
	        "type": "combat",
	        "details": [
	        "You’re extremely dangerous to enemies around you. The ferocity of your melee attacks stresses and distracts enemies even when your blows don't draw blood.",
	        "<b>Level 1</b>: Gain any combat skill as a bonus. The Shock damage of your weapon treats all targets as if they were AC 10, assuming your weapon is capable of harming the target in the first place.",
	        "<b>Level 2</b>: As above, but you gain a +2 bonus to the Shock damage rating of all melee weapons you use. Your regular hits with a weapon never do less damage than this Shock would do on a miss."
	        ]
        },
        {
            "name": "Sniper",
	        "type": "combat",
	        "details": [
	        "You are an expert at placing a bullet or beam on an unsuspecting target. These special benefits only apply when making a surprise attack, as described on page XX.",
	        "<b>Level 1</b>: Gain Shoot as a bonus skill. When making a surprise attack skill check with firearms or bows, roll 3d6 and drop the lowest die.",
	        "<b>Level 2</b>: A target hit by your sniping attempt takes a -4 penalty on the Physical saving throw to avoid immediate mortal injury. When making a surprise attack skill check with firearms or bows, roll 4d6 and drop the two lowest dice."
	        ]
        },
        {
	        "name": "Specialist",
	        "type": "normal",
	        "details": [
	        "You are remarkably talented at a particular skill. Whether a marvelous cat burglar, a world-famous athlete, a brilliant engineer, or some other savant, your expertise is extremely reliable. You may take this focus more than once for different skills.",
	        "<b>Level 1</b>: Gain a non-combat, non-psychic skill as a bonus. Roll 3d6 and drop the lowest die for all skill checks in this skill.",
	        "<b>Level 2</b>: Roll 4d6 and drop the two lowest dice for all skill checks in this skill."
	        ]
        },
        {
            "name": "Starfarer",
	        "type": "normal",
	        "details": [
	        "You are an expert in the plotting and execution of interstellar spike drills. While most experienced pilots can manage conventional drills along well-charted spike routes, you have the knack for forging new drill paths and cutting courses too dangerous for lesser navigators.",
	        "<b>Level 1</b>: Gain Pilot as a bonus skill. You automatically succeed at all spike drill-related skill checks of difficulty 10 or less.",
	        "<b>Level 2</b>: Double your Pilot skill for all spike drill-related skill checks. Spike drives of ships you navigate are treated as one level higher; thus, a drive-1 is treated as a drive-2, up to a maximum of drive-7. Spike drills you personally oversee take only half the time they would otherwise require."
	        ]
        },
        {
	        "name": "Tinker",
	        "type": "normal",
	        "details": [
	        "You have a natural knack for modifying and improving equipment, as given in the rules on page XX.",
	        "<b>Level 1</b>: Gain Fix as a bonus skill. Your Maintenance score is doubled, allowing you to maintain twice as many mods. Mods cost only half their usual price in credits, though pretech salvage requirements remain the same.",
	        "<b>Level 2</b>: Your Fix skill is treated as one level higher for purposes of building and maintaining mods and calculating your Maintenance score. Advanced mods require one fewer pretech salvage part to make, down to a minimum of zero."
	        ]
        },
        {
            "name": "Unarmed Combatant",
	        "type": "combat",
	        "details": [
	        "Your empty hands are more dangerous than knives and guns in the grip of the less gifted. Your unarmed attacks are counted as melee weapons when it comes to binding up opponents wielding rifles and similar long arms, though you need at least one hand free to do so.",
	        "<b>Level 1</b>: Gain Punch as a bonus skill. Your unarmed attacks become more dangerous as your Punch skill increases. At level-0, they do 1d6 damage. At level-1, they do 1d8 damage. At level-2 they do 1d10, level-3 does 1d12, and level-4 does 2d8. At Punch-1 or better, they have the Shock quality equal to 1 plus your Punch skill against AC 15 or less. While you normally add your Punch skill level to any unarmed damage, don't add it twice to this Shock damage.",
	        "<b>Level 2</b>: You know locks and twists that use powered servos against their wearer. Your unarmed attacks count as TL4 weapons for the purpose of overcoming advanced armors. Even on a miss with a Punch attack, you do an unmodified 1d6 damage."
	        ]
        },
        {
	        "name": "Wanderer",
	        "type": "normal",
	        "details": [
	        "Your hero gets around. As part of a life on the road, they've mastered a number of tricks for ensuring their mobility and surviving the inevitable difficulties of a vagabond existence.",
	        "<b>Level 1</b>: Gain Survive as a bonus skill. You can convey basic ideas in all the common languages of the sector. You can always find free transport to a desired destination for yourself and a small group of your friends provided any traffic goes to the place. Finding this transport takes no more than an hour, but it may not be a strictly legitimate means of travel and may require working passage.",
	        "<b>Level 2</b>: You can forge, scrounge, or snag travel papers and identification for the party with 1d6 hours of work. These papers and permits will stand up to ordinary scrutiny, but require an opposed Int/Administer versus Wis/Notice check if examined by an official while the PC is actually wanted by the state for some crime. When finding transport for the party, the transportation always makes the trip at least as fast as a dedicated charter would."
	        ]
        }
    ],
    "skills": [
        {
            "name": "Administer",
            "type": "normal",
            "details": ["Manage an organization, handle paperwork, analyze records, and keep an institution functioning on a daily basis. Roll it for bureaucratic expertise, organizational management, legal knowledge, dealing with government agencies, and understanding how institutions really work."]
        },
        {
            "name": "Connect",
            "type": "normal",
            "details": ["Find people who can be helpful to your purposes and get them to cooperate with you. Roll it to make useful connections with others, find people you know, know where to get illicit goods and services, and be familiar with foreign cultures and languages. You can use it in place of Talk for persuading people you find via this skill."]
        },
        {
            "name": "Exert",
            "type": "normal",
            "details": ["Apply trained speed, strength, or stamina in some feat of physical exertion. Roll it to run, jump, lift, swim, climb, throw, and otherwise exert your bodily prowess. You can use it as a combat skill when throwing things if you wish."]
        },
        {
            "name": "Fix",
            "type": "normal",
            "details": ["Create and repair devices both simple and complex. How complex will depend on your character's background; a lostworlder blacksmith is going to need some study time before he's ready to fix that broken fusion reactor, though he can do it eventually. Roll it to fix things, build things, and identify what something is supposed to do."]
        },
        {
            "name": "Heal",
            "type": "normal",
            "details": ["Employ medical and psychological treatment for the injured or disturbed. Roll it to cure diseases, stabilize the critically injured, treat psychological disorders, or diagnose illnesses."]
        },
        {
            "name": "Know",
            "type": "normal",
            "details": ["Know facts about academic or scientific fields. Roll it to understand planetary ecologies, remember relevant history, solve science mysteries, and know the basic facts about rare or esoteric topics."]
        },
        {
            "name": "Lead",
            "type": "normal",
            "details": ["Convince others to also do whatever it is you're trying to do. Talk might persuade them that following you is smart, but Lead can make them do it even when they think it's a bad idea. Roll it to lead troops in combat, convince others to follow you, or maintain morale and discipline."]
        },
        {
            "name": "Notice",
            "type": "normal",
            "details": ["Spot anomalies or interesting facts about your environment. Roll it for searching places, detecting ambushes, spotting things, and reading the emotional state of other people."]
        },
        {
            "name": "Perform",
            "type": "normal",
            "details": ["Exhibit some performative skill. Roll it to dance, sing, orate, act, or otherwise put on a convincing or emotionally moving performance."]
        },
        {
            "name": "Pilot",
            "type": "normal",
            "details": ["Use this skill to pilot vehicles or riding beasts. Roll it to fly spaceships, drive vehicles, ride animals, or tend to basic vehicle repair. This skill doesn’t help you with things entirely outside the scope of your background or experience, though with some practice a PC can expand their expertise."]
        },
        {
            "name": "Program",
            "type": "normal",
            "details": ["Operating or hacking computing and communications hardware. Roll it to program or hack computers, control computer-operated hardware, operate communications tech, or decrypt things."]
        },
        {
            "name": "Punch",
            "type": "combat",
            "details": ["Use it as a combat skill when fighting unarmed. If your PC means to make a habit of this rather than as a recourse of desperation, you should take the Unarmed Fighter focus described later."]
        },
        {
            "name": "Shoot",
            "type": "combat",
            "details": ["Use it as a combat skill when using ranged weaponry, whether hurled rocks, bows, laser pistols, combat rifles, or ship’s gunnery."]
        },
        {
            "name": "Sneak",
            "type": "normal",
            "details": ["Move without drawing notice. Roll it for stealth, disguise, infiltration, manual legerdemain, pickpocketing, and the defeat of security measures."]
        },
        {
            "name": "Stab",
            "type": "combat",
            "details": ["Use it as a combat skill when wielding melee weapons, whether primitive or complex."]
        },
        {
            "name": "Survive",
            "type": "normal",
            "details": ["Obtain the basics of food, water, and shelter in hostile environments, along with avoiding their natural perils. Roll it to handle animals, navigate difficult terrain, scrounge urban resources, make basic tools, and avoid wild beasts or gangs."]
        },
        {
            "name": "Talk",
            "type": "normal",
            "details": ["Convince other people of the facts you want them to believe. What they do with that conviction may not be completely predictable. Roll it to persuade, charm, or deceive others in conversation."]
        },
        {
            "name": "Trade",
            "type": "normal",
            "details": ["Find what you need on the market and sell what you have. Roll it to sell or buy things, figure out where to purchase hard-to-get or illicit goods, deal with customs agents, or run a business."]
        },
        {
            "name": "Work",
            "type": "normal",
            "details": ["This is a catch-all skill for professions not represented by other skills. Roll it to work at a particular profession, art, or trade."]
        },
        {
            "name": "Biopsion",
            "type": "psychic",
            "details": [
            "Core Technique: <i>Psychic Succor</i>",
            "The adept’s touch stabilizes critically-wounded organisms. More sophisticated practitioners can heal tissue injuries, though curing diseases, detoxifying poisons, and fixing congenital deformities require additional techniques. Each use of Psychic Succor adds one point of System Strain to the target, or two points if they were mortally wounded at the time.<br>Activating Psychic Succor requires the biopsion to Commit Effort for the day. Once used, they can continue to use it for the rest of that scene without Committing Effort again.",
            "<b>Level-0</b>: The psychic’s touch can automatically stabilize a critically-wounded target as a Main Action. This power must be used on a target within six rounds of their collapse, and does not function on targets that have been decapitated or killed by Heavy weapons. It’s the GM’s decision as to whether a target is intact enough for this power to work.",
            "<b>Level-1</b>: As level-0, and heal 1d6+1 hit points of damage. If used on a mortally-wounded target, they revive with the rolled hit points and can act normally on the next round.",
            "<b>Level-2</b>: As level-1, but healing 2d6+2 hit points instead.",
            "<b>Level-3</b>: As level-2, but healing 2d6+6 hit points instead.",
            "<b>Level-4</b>: As level-3, but healing 3d6+8 hit points instead."
            ]
        },
        {
            "name": "Metapsion",
            "type": "psychic",
            "details": [
            "Core Technique: <i>Psychic Refinement</i>",
            "The metapsion gains improved mastery over their own powers and an innate sensitivity to the use of psionic abilities in their presence.",
            "<b>Level-0</b>: The adept can visually and audibly detect the use of psychic powers. If both the source and target are visible to the metapsion, they can tell who’s using the power, even if it’s normally imperceptible. They gain a +2 bonus on any saving throw versus a psionic power.",
            "<b>Level-1</b>: The metapsion’s maximum Effort increases by an additional point.",
            "<b>Level-2</b>: The adept can determine whether or not a person is a psychic or has latent psionic abilities through one round of visual inspection. Their saving throw bonus against psionic powers increases to +3.",
            "<b>Level-3</b>: The metapsion’s maximum Effort increases by an additional point.",
            "<b>Level-4</b>: The metapsion can perform a slightly safer version of torching. Instead of rolling the torching damage die, they simply suffer 10 hit points of damage after torching is used. The damage occurs after the fueled power activates, allowing a psychic at low hit points to trigger a power before falling unconscious. This damage cannot be healed by anything but natural bed rest, though a psychic can be stabilized if this technique drops her to zero hit points."
            ]
        },
        {
            "name": "Precognition",
            "type": "psychic",
            "details": [
            "Core Technique: <i>Oracle</i>",
            "The precog gains a progressively-greater intuitive understanding of their own future. Each invocation of the Oracle technique requires a Main Action and that the user Commit Effort for the day. Once triggered, the adept gets a single brief vision related to the question about the future that they’re asking. This vision is always from their own personal vantage point and never reveals more than a minute of insight, though the psychic processes it almost instantly as part of the power’s use.",
            "The GM should answer the question as if the PC were about to perform the act or engage in the investigation pertinent to the question. Thus, if the adept wanted to know what pressing a button would do and the GM knows that it’s connected to a bomb, the psychic might get a vision of sudden death. If the bomb were on a time delay that extended past the time horizon of the oracle, however, the psychic might just see a vision of herself waiting patiently, with nothing happening.",
            "Visions should relate to actions and events, not abstract facts. Oracle couldn’t tell a psychic who the crime boss of a slum neighborhood is, for example, but it could give a vision of the psychic caught in the next bloody riot and the gang boss who’s directing the myriad thugs. It couldn’t reveal the name of a security guard, but it could show the seer the impending moment that the next guard patrol will enter the area the psychic plans to infiltrate. Only the most important or significant information is conveyed by the technique, even if multiple events of interest might transpire during the time horizon.",
            "Oracle can only be used on a given question or topic once until the situation changes substantially or a week goes by. The maximum time horizon of the Oracle increases as the adept’s Precognition skill improves.",
            "<b>Level-0</b>: One minute into the future.",
            "<b>Level-1</b>: One day into the future.",
            "<b>Level-2</b>: One week into the future.",
            "<b>Level-3</b>: Three months into the future.",
            "<b>Level-4</b>: One year into the future."
            ]
        },
        {
            "name": "Telekinesis",
            "type": "psychic",
            "details": [
            "Core Technique: <i>Telekinetic Manipulation</i>",
            "The adept may Commit Effort for the scene as a Main Action to direct telekinetic force toward an object or person within unaided visual range or with tactile contact with the psychic. The strength and precision of the force increases with the expertise of the psychic. This force isn’t responsive enough to be usable as a weapon without further refinement of technique, and cannot cause damage to living or mobile targets. If used to crush or harm immobile unliving objects, it does 1d6 damage per skill level of the psychic.",
            "A telekinetic force can be maintained over multiple rounds without expending further actions, such as holding a metal platform in place under a group of allies, but the psychic cannot use this technique on a second object until they release the first.",
            "<b>Level-0</b>: The psychic can exert force as if with one hand and their own physical strength.",
            "<b>Level-1</b>: The psychic can manipulate objects as if with both hands and can lift up to two hundred kilograms with this ability.",
            "<b>Level-2</b>: The psychic can lift or manipulate up to four hundred kilograms and blast a human-sized hole in structures of light wooden construction or lighter as a Main Action.",
            "<b>Level-3</b>: The psychic can manipulate up to eight hundred kilograms and can affect as many individual objects at once as they have Telekinesis skill levels.",
            "<b>Level-4</b>: The psychic can manipulate up to a metric ton and can smash human-sized holes in TL4-constructed exterior walls, light stone walls, or similar barriers as a Main Action."
            ]
        },
        {
            "name": "Telepathy",
            "type": "psychic",
            "details": [
            "Core Technique: <i>Telepathic Contact</i>",
            "The telepath can obtain a progressively-deeper understanding of a sentient target’s thoughts. The target must be visible or otherwise perceptible to the telepath’s unaided senses. Opening a contact requires the telepath to Commit Effort for the day as a Main Action, and the contact lasts for a scene at most unless augmented by other techniques.",
            "The depth of contact that can be made depends on the psychic’s Telepathy skill. A single contact can use any or all of the effects permitted to a telepath of the user’s skill level. Basic forms of contact do not allow for a saving throw, though more advanced probes allow the target to make a Mental saving throw to resist. On a successful save, no form of of this technique that allows a save can be used on them for the rest of the scene.",
            "<b>Level-0</b>: Observe emotional states in a target. Intense emotions provide a single word or image related to the focus of the feelings.",
            "<b>Level-1</b>: A shallow gestalt with the target’s language centers allows the telepath to understand any form of communication made by the target. If the psychic has the requisite body parts to speak the target’s language, they can communicate with it in turn.",
            "<b>Level-2</b>: The psychic’s awareness of the target’s surface cognition is sophisticated enough to read their current thoughts, though it can’t pick up memories or non-obvious connections. The target gets a Mental saving throw to resist this.",
            "<b>Level-3</b>: The psychic can drill down into the target’s memory to get a one or two-sentence answer to any single question they ask, or receive a single answering vision of the target’s recollections. The target can attempt a Mental saving throw to resist this power, and whether or not it succeeds the contact is automatically ended. It can be re-established, but only by activating this technique again.",
            "<b>Level-4</b>: The psychic can get a full and nuanced awareness of everything the target can remember about a particular topic. The target can attempt a Mental saving throw to resist this power, and whether or not it succeeds the contact is automatically ended. It can be re-established, but only by activating this technique again."
            ]
        },
        {
            "name": "Teleportation",
            "type": "psychic",
            "details": [
            "Core Technique: <i>Personal Apportation</i>",
            "The teleporter can translocate to another location they have either occupied before or can see with their unaided vision. Locations are fixed in reference to the nearest major gravity well. For example, it is not possible to teleport to the cockpit of a distant moving vehicle they once occupied, but they can teleport to another point on a planet’s surface even though the planet has since moved far through the stellar void.",
            "The core technique allows the teleporter to move himself and any mass he is able to carry with his own natural strength. Unwilling targets cannot be carried along, and willing ones must be touched. A teleporter can leave any clothing, shackles, adhesions, or other matter behind when he teleports, but he cannot leave behind matter that has been inserted into his body, such as cybernetics or shrapnel. Matter cannot be partially left behind.",
            "A teleporter will instinctively abort any apportation that would leave him embedded in a solid object or in an environment of imminent physical harm. Any Committed Effort on such aborted jumps is wasted, as is any action spent triggering the power.",
            "The maximum range of Personal Apportation depends on the teleporter’s skill level. Teleporting with Personal Apportation counts as a Main Action and requires that the psychic Commit Effort for the scene.",
            "<b>Level-0</b>: The psychic can teleport up to 10 meters.",
            "<b>Level-1</b>: The psychic can teleport up to 100 meters.",
            "<b>Level-2</b>: The psychic can teleport up to 10 kilometers.",
            "<b>Level-3</b>: The psychic can teleport up to 1,000 kilometers.",
            "<b>Level-4</b>: The psychic can teleport anywhere on a planet’s surface or near orbit."
            ]
        }
    ],
    "armor": [
        {
            "name": "Shield",
            "ac": "13",
            "acbonus": 1,
            "cost": 10,
            "encumbrance": 2,
            "tl": 0,
            "type": "Primitive"
        },
        {
            "name": "Leather jack",
            "ac": "13",
            "acbonus": 0,
            "cost": 10,
            "encumbrance": 1,
            "tl": 0,
            "type": "Primitive"
        },
        {
            "name": "Cuirass",
            "ac": "15",
            "acbonus": 0,
            "cost": 50,
            "encumbrance": 1,
            "tl": 1,
            "type": "Primitive"
        },
        {
            "name": "Full plate",
            "ac": "17",
            "acbonus": 0,
            "cost": 100,
            "encumbrance": 2,
            "tl": 1,
            "type": "Primitive"
        },
        {
            "name": "Warpaint",
            "ac": "12",
            "acbonus": 0,
            "cost": 300,
            "encumbrance": 0,
            "tl": 4,
            "type": "Street"
        },
        {
            "name": "Armored Undersuit",
            "ac": "13",
            "acbonus": 0,
            "cost": 600,
            "encumbrance": 0,
            "tl": 4,
            "type": "Street"
        },
        {
            "name": "Secure Clothing",
            "ac": "13",
            "acbonus": 0,
            "cost": 300,
            "encumbrance": 1,
            "tl": 4,
            "type": "Street"
        },
        {
            "name": "Armored Vacc Suit",
            "ac": "13",
            "acbonus": 0,
            "cost": 400,
            "encumbrance": 2,
            "tl": 4,
            "type": "Street"
        },
        {
            "name": "Deflector Array",
            "ac": "18",
            "acbonus": 0,
            "cost": 30000,
            "encumbrance": 0,
            "tl": 5,
            "type": "Street"
        },
        {
            "name": "Security Armor",
            "ac": "14",
            "acbonus": 0,
            "cost": 700,
            "encumbrance": 1,
            "tl": 4,
            "type": "Combat"
        },
        {
            "name": "Woven Body Armor",
            "ac": "15",
            "acbonus": 0,
            "cost": 400,
            "encumbrance": 2,
            "tl": 3,
            "type": "Combat"
        },
        {
            "name": "Combat Field Uniform",
            "ac": "16",
            "acbonus": 0,
            "cost": 1000,
            "encumbrance": 1,
            "tl": 4,
            "type": "Combat"
        },
        {
            "name": "Icarus Harness",
            "ac": "16",
            "acbonus": 0,
            "cost": 8000,
            "encumbrance": 1,
            "tl": 4,
            "type": "Combat"
        },
        {
            "name": "Vestimentum",
            "ac": "18",
            "acbonus": 0,
            "cost": 15000,
            "encumbrance": 0,
            "tl": 5,
            "type": "Powered"
        },
        {
            "name": "Assault Suit",
            "ac": "18",
            "acbonus": 0,
            "cost": 10000,
            "encumbrance": 2,
            "tl": 4,
            "type": "Powered"
        },
        {
            "name": "Storm Armor",
            "ac": "19",
            "acbonus": 0,
            "cost": 20000,
            "encumbrance": 2,
            "tl": 5,
            "type": "Powered"
        },
        {
            "name": "Field Emitter Panoply",
            "ac": "20",
            "acbonus": 0,
            "cost": 40000,
            "encumbrance": 1,
            "tl": 5,
            "type": "Powered"
        },
        {
            "name": "Force Pavis",
            "ac": "15",
            "acbonus": 1,
            "cost": 10000,
            "encumbrance": 1,
            "tl": 5,
            "type": "Powered"
        }
    ],
    "weapons": [
        {
            "name": "Small primitive weapon",
            "type": "melee",
            "damage": "1d4",
	        "shock": 1,
            "shockac": 15,
            "attribute": "Str/Dex",
            "cost": 0,
            "encumbrance": 1,
            "tl": 0,
            "details": ["Small weapons are small one-handed implements no larger than a baton or knife. These weapons are easily concealed in normal clothing, and can even be kept Readied up sleeves or in tailored pockets. Many can be thrown at a range up to 10 meters."]
        },
        {
            "name": "Medium primitive weapon",
	        "type": "melee",
	        "damage": "1d6+1",
	        "shock": 2,
	        "shockac": 13,
	        "attribute": "Str/Dex",
	        "cost": 20,
	        "encumbrance": 1,
	        "tl": 0,
	        "details": ["Medium weapons are one-handed swords, axes, spears, or other obvious implements of war. While they can't be effectively concealed in anything smaller than an enveloping cloak or coat, they're also more damaging to an unfortunate victim struck by them, albeit they're somewhat less nimble when the wielder needs to strike at unprotected flesh. Spears and similar aerodynamic weapons can be thrown up to 30 meters."]
        },
        {
	        "name": "Large primitive weapon",
	        "type": "melee",
	        "damage": "1d8+1",
	        "shock": 2,
	        "shockac": 15,
	        "attribute": "Str",
	        "cost": 30,
	        "encumbrance": 2,
	        "tl": 0,
	        "details": ["Large weapons are two-handed implements of bodily ruin such as claymores, halberds, tetsubos, or other such weapons. Unlike smaller weapons, they rely largely on Strength for their employ, and can bash through lighter forms of armor. Large weapons count as two encumbrance items."]
        },
        {
            "name": "Small advanced weapon",
	        "type": "melee",
	        "damage": "1d6",
	        "shock": 1,
	        "shockac": 15,
	        "attribute": "Str/Dex",
	        "cost": 40,
	        "encumbrance": 1,
	        "tl": 4,
	        "details": ["Small weapons are small one-handed implements no larger than a baton or knife. These weapons are easily concealed in normal clothing, and can even be kept Readied up sleeves or in tailored pockets. Many can be thrown at a range up to 10 meters."]
        },
        {
	        "name": "Medium advanced weapon",
	        "type": "melee",
	        "damage": "1d8+1",
	        "shock": 2,
	        "shockac": 13,
	        "attribute": "Str/Dex",
	        "cost": 60,
	        "encumbrance": 1,
	        "tl": 4,
	        "details": ["Medium weapons are one-handed swords, axes, spears, or other obvious implements of war. While they can't be effectively concealed in anything smaller than an enveloping cloak or coat, they're also more damaging to an unfortunate victim struck by them, albeit they're somewhat less nimble when the wielder needs to strike at unprotected flesh. Spears and similar aerodynamic weapons can be thrown up to 30 meters."]
        },
        {
            "name": "Large advanced weapon",
	        "type": "melee",
	        "damage": "1d10+1",
	        "shock": 2,
	        "shockac": 15,
	        "attribute": "Str",
	        "cost": 80,
	        "encumbrance": 2,
	        "tl": 4,
	        "details": ["Large weapons are two-handed implements of bodily ruin such as claymores, halberds, tetsubos, or other such weapons. Unlike smaller weapons, they rely largely on Strength for their employ, and can bash through lighter forms of armor. Large weapons count as two encumbrance items."]
        },
        {
	        "name": "Stun baton",
	        "type": "melee",
	        "damage": "1d8",
	        "shock": 1,
	        "shockac": 15,
	        "attribute": "Str/Dex",
	        "cost": 50,
	        "encumbrance": 1,
	        "tl": 4,
	        "details": ["Stun batons are common law enforcement tools. The damage they do can drop a target to zero hit points, but will not kill them, the victim awakening in ten minutes with one hit point. Stun batons trickle-charge from normal movement and will not run out of electrical energy under normal use conditions."]
        },
        {
            "name": "Suit ripper",
	        "type": "melee",
	        "damage": "1d6",
            "attribute": "Str/Dex",
	        "cost": 75,
	        "encumbrance": 1,
	        "tl": 4,
	        "details": ["Suit rippers are rods with fractal cutting surfaces designed to cripple vacc suit auto-repair routines. Every hit with a suit ripper counts as a suit tear on a vacc suit-wearing enemy. Unsurprisingly, these weapons are strictly illegal in space environments."]
        },
        {
	        "name": "Unarmed attack",
	        "type": "melee",
	        "damage": "1d2*",
	        "attribute": "Str/Dex",
	        "details": ["Unarmed attacks reflect ordinary kicks and punches. Unarmed attacks always add the attacker's Punch skill to damage rolls, unlike other weapons. A combatant must have at least one hand free to fight with unarmed attacks; kicks have their uses, but if both your hands are full of a plasma projector you can't then claim to be wielding a melee weapon when it comes time to bind up an enemy's mag rifle."]
        },
        {
            "name": "Primitive Bow",
	        "type": "projectile",
	        "damage": "1d6",
	        "range": 50,
	        "maxrange": 75,
	        "cost": 15,
	        "magazine": 1,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 1,
	        "details": [ "Bows are uncommon weapons in the far future, though some lostworlder barbarians have nothing better. Bows can be reloaded with a Move action, or faster if the Gunslinger focus is applied." ]
        },
        {
	        "name": "Advanced Bow",
	        "type": "projectile",
	        "damage": "1d6",
	        "range": 100,
	        "maxrange": 150,
	        "cost": 50,
	        "magazine": 1,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 3,
	        "details": [ "Bows are uncommon weapons in the far future, though some lostworlder barbarians have nothing better. Bows can be reloaded with a Move action, or faster if the Gunslinger focus is applied." ]
        },
        {
	        "name": "Conversion Bow",
	        "type": "projectile",
	        "damage": "1d8",
	        "range": 150,
	        "maxrange": 300,
	        "cost": 500,
	        "magazine": 1,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 4,
	        "details": [ "Sophisticated \"conversion bows\" use special materials to convert the kinetic energy of the draw into into a force field \"glazing\" around the arrow. improving penetration. Bows can be reloaded with a Move action, or faster if the Gunslinger focus is applied." ]
        },
        {
	        "name": "Grenade",
	        "type": "thrown",
	        "damage": "2d6",
	        "range": 10,
	        "maxrange": 30,
	        "cost": 25,
	        "encumbrance": 1,
	        "attribute": "Dex",
	        "tl": 3,
	        "details": [ "Grenade users always roll to attack AC 10. On a miss, the grenade lands 1d10 meters away from the target in a random direction. Hit or miss, the grenade then explodes for 2d6 damage to all targets within 5 meters. Victims are allowed an Evasion save for half damage. Targets take 1 less point of damage for each point of AC above 14. Grenades can be thrown with the Exert skill instead of Shoot, if desired." ]
        },
        {
            "name": "Crude Pistol",
	        "type": "projectile",
	        "damage": "1d6",
	        "range": 5,
	        "maxrange": 15,
	        "cost": 20,
	        "magazine": 1,
	        "encumbrance": 1,
	        "attribute": "Dex",
	        "tl": 2,
	        "details": [ "Crude pistols and muskets represent the rawest and most primitive forms of gunpowder weaponry, usually makeshift weapons improvised by criminals or the desperate. Reloading a crude pistol or a musket requires two rounds instead of one." ]
        },
        {
	        "name": "Musket",
	        "type": "projectile",
	        "damage": "1d12",
	        "range": 25,
	        "maxrange": 50,
	        "cost": 30,
	        "magazine": 1,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 2,
	        "details": [ "Crude pistols and muskets represent the rawest and most primitive forms of gunpowder weaponry, usually makeshift weapons improvised by criminals or the desperate. Reloading a crude pistol or a musket requires two rounds instead of one." ]
        },
        {
            "name": "Revolver",
	        "type": "projectile",
	        "damage": "1d8",
	        "range": 30,
	        "maxrange": 100,
	        "cost": 50,
	        "magazine": 6,
	        "encumbrance": 1,
	        "attribute": "Dex",
	        "tl": 2,
	        "details": [ "Revolvers are quite popular on frontier worlds, as the weapons are extremely reliable and can be repaired and manufactured even by primitive metallurgists. Some revolver variants are specially built to handle atmospheres that would destroy more fragile weapons." ]
        },
        {
	        "name": "Rifle",
	        "type": "projectile",
	        "damage": "1d10+2",
	        "range": 200,
	        "maxrange": 400,
	        "cost": 75,
	        "magazine": 6,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 2,
	        "details": [ "Rifles are the mainstays of most TL2 armies and hunters, thanks to their superior range and power." ]
        },
        {
            "name": "Shotgun",
	        "type": "projectile",
	        "damage": "3d4",
            "range": 10,
	        "maxrange": 30,
	        "cost": 50,
	        "magazine": 2,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 2,
	        "details": [ "Shotguns are cheaper and more easily manufactured than rifles, and are popular weapons for home defense on the frontier. The statistics given are for shot ammunition. Slug rounds do 2d6 damage and have ranges of 50/75 meters." ]
        },
        {
	        "name": "Semi-Auto Pistol",
	        "type": "projectile",
	        "damage": "1d6+1",
	        "range": 30,
	        "maxrange": 100,
	        "cost": 75,
	        "magazine": 12,
	        "encumbrance": 1,
	        "attribute": "Dex",
	        "tl": 3,
	        "details": [ "Semi-automatic pistols trade some of the reliability of the revolver for a larger magazine size. They tend to be the favorite sidearm for locals on planets that lack the harsh conditions or uncertain maintenance opportunities of a frontier world." ]
        },
        {
            "name": "Submachine Gun",
	        "type": "projectile",
	        "damage": "1d8*",
            "range": 30,
	        "maxrange": 100,
	        "cost": 200,
	        "magazine": 20,
	        "encumbrance": 1,
	        "attribute": "Dex",
	        "tl": 3,
	        "details": [ "Submachine guns take pistol ammunition but fire it at a high rate of speed. These weapons can fire in burst mode." ]
        },
        {
	        "name": "Combat Rifle",
	        "type": "projectile",
	        "damage": "1d12*",
            "range": 100,
            "maxrange": 300,
            "cost": 300,
            "magazine": 30,
            "encumbrance": 2,
            "attribute": "Dex",
            "tl": 3,
            "details": [ "Combat rifles are favored by the militaries of tech level 3 worlds, trading some of the often-unnecessary range and penetration of a conventional rifle for a larger ammunition capacity and burst fire capabilities. On more strait-laced worlds such military weaponry is often illegal for civilians to possess." ]
        },
        {
            "name": "Combat Shotgun",
	        "type": "projectile",
	        "damage": "3d4*",
            "range": 10,
	        "maxrange": 30,
	        "cost": 300,
	        "magazine": 12,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 3,
	        "details": [ "Combat shotguns are more complicated and temperamental versions of conventional shotguns. These weapons have substantially larger ammunition capacity and are capable of firing in burst mode. Combat shotguns can fire slug rounds just as normal shotguns." ]
        },
        {
	        "name": "Sniper Rifle",
	        "type": "projectile",
	        "damage": "2d8",
	        "range": 1000,
	        "maxrange": 2000,
	        "cost": 400,
	        "magazine": 1,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 3,
	        "details": [ "Sniper rifles are designed to be exceptionally effective at dropping unsuspecting targets at long range. Aside from the additional effective range of a sniper rifle, any target it mortally wounds via a surprise attack will die instantly, with no chance for stabilization. The surprise attack must qualify according to the terms on p. XX. If the rifle is used outside of such conditions, it has no special qualities." ]
        },
        {
            "name": "Void Carbine",
	        "type": "projectile",
	        "damage": "2d6",
	        "range": 100,
	        "maxrange": 300,
	        "cost": 400,
	        "magazine": 10,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 4,
	        "details": [ "Void carbines are designed for vacuum and zero-gee use, and have essentially no recoil. Their rounds cannot penetrate ordinary ship equipment plating." ]
        },
        {
	        "name": "Mag Pistol",
	        "type": "projectile",
	        "damage": "2d6+2",
	        "range": 100,
	        "maxrange": 300,
	        "cost": 400,
	        "magazine": 6,
	        "encumbrance": 1,
	        "attribute": "Dex",
	        "tl": 4,
	        "details": [ "Mag weaponry involves the magnetic acceleration of metal flechettes, while spike throwers are the shotgun equivalents of these weapons. Mag ammunition is packaged with integral power supplies, so no additional power cells are necessary to fire these weapons." ]
        },
        {
            "name": "Mag Rifle",
	        "type": "projectile",
	        "damage": "2d8+2",
	        "range": 300,
	        "maxrange": 600,
	        "cost": 500,
	        "magazine": 10,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 4,
	        "details": [ "Mag weaponry involves the magnetic acceleration of metal flechettes, while spike throwers are the shotgun equivalents of these weapons. Mag ammunition is packaged with integral power supplies, so no additional power cells are necessary to fire these weapons." ]
        },
        {
	        "name": "Spike Thrower",
	        "type": "projectile",
	        "damage": "3d8*",
            "range": 20,
            "maxrange": 40,
            "cost": 600,
            "magazine": 15,
            "encumbrance": 2,
            "attribute": "Dex",
            "tl": 4,
            "details": [ "Mag weaponry involves the magnetic acceleration of metal flechettes, while spike throwers are the shotgun equivalents of these weapons. Mag ammunition is packaged with integral power supplies, so no additional power cells are necessary to fire these weapons." ]
        },
        {
            "name": "Laser Pistol",
	        "type": "energy",
	        "damage": "1d6",
	        "range": 100,
	        "maxrange": 300,
	        "cost": 200,
	        "magazine": 10,
	        "encumbrance": 1,
	        "attribute": "Dex",
	        "tl": 4,
	        "details": [ "Laser pistols and laser rifles are the most common type of energy weapon, though pistols are considerably less energy-efficient. Depending on the tech used in the sector, they might produce silent, invisible beams of death or noisy, brightly-colored streaks of lethal light. The phased multifrequency beam is capable of penetrating any ordinary mist or haze, but a thick cloud of thermally-resistant particulate matter such as ash or sand can seriously degrade the beam, applying up to a -4 penalty to hit and cutting ranges in half." ]
        },
        {
	        "name": "Laser Rifle",
	        "type": "energy",
	        "damage": "1d10*",
            "range": 300,
            "maxrange": 500,
            "cost": 300,
            "magazine": 20,
            "encumbrance": 2,
            "attribute": "Dex",
            "tl": 4,
            "details": [ "Laser pistols and laser rifles are the most common type of energy weapon, though pistols are considerably less energy-efficient. Depending on the tech used in the sector, they might produce silent, invisible beams of death or noisy, brightly-colored streaks of lethal light. The phased multifrequency beam is capable of penetrating any ordinary mist or haze, but a thick cloud of thermally-resistant particulate matter such as ash or sand can seriously degrade the beam, applying up to a -4 penalty to hit and cutting ranges in half." ]
        },
        {
            "name": "Thermal Pistol",
	        "type": "energy",
	        "damage": "2d6",
	        "range": 25,
	        "maxrange": 50,
	        "cost": 300,
	        "magazine": 5,
	        "encumbrance": 1,
	        "attribute": "Dex",
	        "tl": 4,
	        "details": [ "Thermal pistols and their larger, two-handed plasma projector cousins replace the beam of a laser with a small sphere of magnetically-shaped plasma. The spheres tend to dissipate at much shorter ranges than a laser beam, but do significantly more damage to targets within range and are not affected by ambient particulates. They tend to be extremely loud in operation." ]
        },
        {
	        "name": "Plasma Projector",
	        "type": "energy",
	        "damage": "2d8",
	        "range": 50,
	        "maxrange": 100,
	        "cost": 400,
	        "magazine": 6,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 4,
	        "details": [ "Thermal pistols and their larger, two-handed plasma projector cousins replace the beam of a laser with a small sphere of magnetically-shaped plasma. The spheres tend to dissipate at much shorter ranges than a laser beam, but do significantly more damage to targets within range and are not affected by ambient particulates. They tend to be extremely loud in operation." ]
        },
        {
            "name": "Shear Rifle",
	        "type": "energy",
	        "damage": "2d8*",
            "range": 100,
	        "maxrange": 300,
	        "cost": 600,
	        "magazine": 10,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 5,
	        "details": [ "Shear rifles are the product of a relatively few functioning pretech manufactories. These weapons use miniaturized grav projectors to create dangerous repulsor fields inside a target, tearing the object apart along perfectly smooth planes. Shear rifles are completely silent in operation." ]
        },
        {
	        "name": "Thunder Gun",
	        "type": "energy",
	        "damage": "2d10",
	        "range": 100,
	        "maxrange": 300,
	        "cost": 1000,
	        "magazine": 6,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 5,
	        "details": [ "Thunder guns are named for the basso vibrations caused by their operation, a sound that can be felt as far as thirty meters away from an operator. This two-handed weapon uses grav plates to create rapid, randomized disruptions in a target that increase the chance of complete structural collapse. If a thunder gun hits a target with an unmodified hit roll of 16 or higher an extra 1d10 damage is rolled. This bonus damage always applies to inanimate targets." ]
        },
        {
            "name": "Distortion Cannon",
	        "type": "energy",
	        "damage": "2d12",
	        "range": 100,
	        "maxrange": 300,
	        "cost": 1250,
	        "magazine": 6,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 5,
	        "details": [ "Distortion cannons are among the most sophisticated man-portable weapons designed before the Scream. These two-handed energy weapons rely on the same principle as does a spike drive, manipulating the underlying fabric of space to disrupt a target. Provided the wielder can see a target within range or accurately fix its location within one meter, the distortion cannon can ignore up to one meter of solid cover between the gun and its target." ]
        },
        {
	        "name": "Heavy Machine Gun",
	        "type": "heavy",
	        "damage": "3d6#",
	        "range": 500,
	        "maxrange": 2000,
	        "cost": 5000,
	        "magazine": 10,
	        "encumbrance": 3,
	        "attribute": "Dex",
	        "tl": 3,
	        "details": [ "Heavy machine guns represent a large family of air- or water-cooled projectile weapons that are usually fed with belts of linked ammunition. HMGs require a vehicle mounting or emplaced firing position for best results. Attempting to shoot one without bedding it down properly on a tripod or other secure mount inflicts a -6 on all hit rolls and makes effective suppressive fire impossible. An HMG magazine contains enough ammunition for 10 rounds of firing, but each round of firing eats 25 credits worth of projectile ammunition." ]
        },
        {
            "name": "Rocket Launcher",
	        "type": "heavy",
	        "damage": "3d10",
	        "range": 2000,
	        "maxrange": 4000,
	        "cost": 4000,
	        "magazine": 1,
	        "encumbrance": 2,
	        "attribute": "Dex",
	        "tl": 3,
	        "details": [ "Rocket launchers cover a wide variety of man-portable missile launchers of varying degrees of sophistication. The weapons are usually equipped with basic tracking sensors, but are of limited accuracy against human-sized targets. Rocket launchers take a -4 hit penalty against targets of human size or smaller. Unlike most Heavy weapons, rocket launchers can be shoulder-fired without a prepared emplacement to support them." ]
        },
        {
	        "name": "Demo Charge",
	        "type": "heavy",
	        "damage": "3d10",
	        "range": 20,
	        "maxrange": 40,
	        "cost": 250,
	        "encumbrance": 1,
	        "tl": 3,
	        "details": [ "Demo Charges are the general run of placed explosives beloved of terrorists and adventurers the world over. The usual variety can be detonated by radio signals, timers, or electrical charges, and inflict their damage on any objects within twenty meters, with an Evasion saving throw for half damage. Victims within forty meters take half damage, with an Evasion save for none. The charge is sufficient to blow a four-meter wide hole in anything short of a reinforced wall. PCs with a background in demolitions or Fix-0 skill can shape the charge so it directs the blast in only one direction, sparing all but two meters of the rest." ]
        },
        {
            "name": "Railgun",
	        "type": "heavy",
	        "damage": "3d8#",
	        "range": 4000,
	        "maxrange": 8000,
	        "cost": 8000,
	        "magazine": 20,
	        "encumbrance": "*",
            "attribute": "Dex",
	        "tl": 4,
	        "details": [ "Railguns are simply scaled-up versions of personal mag rifles. They accelerate large metallic slugs along the weapon’s barrel, creating a steady spray of hypervelocity rounds. Ammunition sufficient for one round of firing costs 50 credits." ]
        },
        {
	        "name": "Anti-Vehicle Laser",
	        "type": "heavy",
	        "damage": "3d10",
	        "range": 2000,
	        "maxrange": 4000,
	        "cost": 10000,
	        "magazine": 15,
	        "encumbrance": "*",
            "attribute": "Dex",
            "tl": 4,
            "details": [ "Anti-vehicle lasers are less useful against soft targets, but excel at penetrating vehicle armor. Against vehicles and other hard-skinned targets, damage is rolled twice and the better result is used." ]
        },
        {
            "name": "Hydra Array",
	        "type": "heavy",
	        "damage": "3d6#",
	        "range": 4000,
	        "maxrange": 8000,
	        "cost": 20000,
	        "magazine": 10,
            "encumbrance": "*",
            "attribute": "Dex",
	        "tl": 4,
	        "details": [ "Hydra arrays sequence a number of missile launchers to fire at once. The gunner designates up to three targets and can then make three rolls to hit divided among them. Each successful hit on a target allows the gunner to roll damage once, but only the highest damage roll is applied to the target. Thus, if all three volleys were aimed at a single target and two of them hit, the gunner would roll damage twice and apply the best result. A volley of Hydra missile fire costs 150 credits." ]
        },
        {
	        "name": "Wheatcutter Belt",
	        "type": "heavy",
	        "damage": "2d12",
	        "range": 10,
	        "maxrange": 20,
	        "cost": 10000,
	        "magazine": 5,
	        "encumbrance": "*",
            "attribute": "Dex",
            "tl": 4,
            "details": [ "Wheatcutter belts are one of several different antipersonnel measures often installed on gravtanks and other fighting vehicles. When triggered, a belt of explosives fires off a scything blast of shrapnel on any side of the vehicle. All creatures within 10 meters of that side of the vehicle must make an Evasion save for half damage. Those within 20 meters take half damage, and can make an Evasion save to take none at all. Wheatcutter belts do not ignore a vehicle’s Armor like other Heavy weapons do. Reloading a wheatcutter belt costs 200 credits per round." ]
        },
        {
            "name": "Vortex Cannon",
	        "type": "heavy",
	        "damage": "5d12",
	        "range": 1000,
	        "maxrange": 2000,
	        "cost": 75000,
	        "magazine": 5,
	        "encumbrance": "*",
            "attribute": "Dex",
	        "tl": 5,
	        "details": [ "Vortex cannons use controlled gravitic shear planes to cause a target to simply fall apart into component fragments. The cannons are silent in operation, but so heavy and complex that they can only be mounted on gravtanks and other similar dedicated fighting vehicles." ]
        }
    ],
    "equipment": [
        {
            "name": "Black slab",
            "cost": 10000,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Data phase tap",
            "cost": 5000,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Data protocol",
            "cost": 1000,
            "encumbrance": 0,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Dataslab",
            "cost": 300,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Line shunt",
            "cost": 100,
            "encumbrance": 0,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Remote link unit",
            "cost": 250,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Stiletto charge",
            "cost": "N/A",
            "encumbrance": 1,
            "tl": 5,
            "details": [ "" ]
        },
        {
            "name": "Storage unit",
            "cost": 500,
            "encumbrance": 3,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Tightbeam link unit",
            "cost": 1000,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Power cell, type A",
            "cost": 10,
            "encumbrance": 1 / 6,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Power cell, type B",
            "cost": 100,
            "encumbrance": 1,
            "tl": 7,
            "details": [ "" ]
        },
        {
            "name": "Solar recharger",
            "cost": 500,
            "encumbrance": 3,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Telekinetic generator",
            "cost": 500,
            "encumbrance": 2,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Comm server",
            "cost": 1000,
            "encumbrance": 3,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Compad",
            "cost": 100,
            "encumbrance": 0,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Field radio",
            "cost": 200,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Translator torc",
            "cost": 200,
            "encumbrance": 0,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Bioscanner",
            "cost": 300,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Lazarus patch",
            "cost": 30,
            "encumbrance": 1 / 6,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Medkit",
            "cost": 100,
            "encumbrance": 2,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Metatool",
            "cost": 200,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Spare parts",
            "cost": 50,
            "encumbrance": 1 / 6,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Tailored antiallergens",
            "cost": 5,
            "encumbrance": 0,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Toolkit/Postech",
            "cost": 300,
            "encumbrance": 3,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Toolkit/Pretech",
            "cost": 1000,
            "encumbrance": 1,
            "tl": 5,
            "details": [ "" ]
        },
        {
            "name": "Atmofilter",
            "cost": 100,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Backpack",
            "cost": 5,
            "encumbrance": 1,
            "tl": 0,
            "details": [ "" ]
        },
        {
            "name": "Backpack (modern)",
            "cost": 50,
            "encumbrance": 0,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Binoculars",
            "cost": 20,
            "encumbrance": 1,
            "tl": 3,
            "details": [ "" ]
        },
        {
            "name": "Binoculars (modern)",
            "cost": 200,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Climbing harness",
            "cost": 50,
            "encumbrance": 1,
            "tl": 3,
            "details": [ "" ]
        },
        {
            "name": "Glowbug",
            "cost": 5,
            "encumbrance": 0,
            "tl": 3,
            "details": [ "" ]
        },
        {
            "name": "Grapnel launcher",
            "cost": 200,
            "encumbrance": 1,
            "tl": 3,
            "details": [ "" ]
        },
        {
            "name": "Grav chute",
            "cost": 300,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Grav chute (pretech)",
            "cost": 1000,
            "encumbrance": 1,
            "tl": 5,
            "details": [ "" ]
        },
        {
            "name": "Grav harness",
            "cost": 5000,
            "encumbrance": 3,
            "tl": 5,
            "details": [ "" ]
        },
        {
            "name": "Instapanel",
            "cost": 50,
            "encumbrance": 1 / 6,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Low-light goggles",
            "cost": 200,
            "encumbrance": 1,
            "tl": 3,
            "details": [ "" ]
        },
        {
            "name": "Navcomp",
            "cost": 500,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Portabox",
            "cost": 50,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Pressure tent",
            "cost": 100,
            "encumbrance": 4,
            "tl": 3,
            "details": [ "" ]
        },
        {
            "name": "Rations, 1 day",
            "cost": 5,
            "encumbrance": 1 / 6,
            "tl": 1,
            "details": [ "" ]
        },
        {
            "name": "Rope, 20 meters",
            "cost": 4,
            "encumbrance": 2,
            "tl": 0,
            "details": [ "" ]
        },
        {
            "name": "Rope, 20 meters (modern)",
            "cost": 40,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Scout report",
            "cost": 200,
            "encumbrance": 0,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Survey scanner",
            "cost": 250,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Survival kit",
            "cost": 60,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Telescoping pole",
            "cost": 10,
            "encumbrance": 0,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Thermal flare",
            "cost": 5,
            "encumbrance": 0,
            "tl": 3,
            "details": [ "" ]
        },
        {
            "name": "Trade goods",
            "cost": 50,
            "encumbrance": 1 / 6,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Trade metals",
            "cost": 10,
            "encumbrance": 1 / 6,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Vacc fresher",
            "cost": 400,
            "encumbrance": 1,
            "tl": 4,
            "details": [ "" ]
        },
        {
            "name": "Vacc skin",
            "cost": 1000,
            "encumbrance": 1,
            "tl": 5,
            "details": [ "" ]
        },
        {
            "name": "Vacc suit",
            "cost": 100,
            "encumbrance": 2,
            "tl": 4,
            "details": [ "" ]
        }
    ],
    "cyberware": [
        {
            "name": "Adrenal Suppression Pump",
            "cost": 30000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Eliminates emotion and improves initiative"]
        },
        {
            "name": "Bioadaptation Augments",
            "cost": 10000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Survive near-habitable planetary conditions"]
        },
        {
            "name": "Body Arsenal Array",
            "cost": 10000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Provides retractable body weaponry"]
        },
        {
            "name": "Body Sculpting",
            "cost": 10000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Complete external physical reconstruction"]
        },
        {
            "name": "Dermal Armor",
            "cost": 20000,
            "systemstrain": 2,
            "tl": 4,
            "details": ["AC 16, immune to primitive weapon Shock"]
        },
        {
            "name": "Drone Control Link",
            "cost": 20000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Allows easier remote control of drones"]
        },
        {
            "name": "Eelskin Capacitor Mesh",
            "cost": 25000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Allows bare-handed hacking and electrical shocks"]
        },
        {
            "name": "Gecko Anchors",
            "cost": 15000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Can climb sheer surfaces as if they were flat"]
        },
        {
            "name": "Ghost Talker Transceiver",
            "cost": 15000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Integral compad with audiovisual transmission"]
        },
        {
            "name": "Holdout Cavity",
            "cost": 10000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Shielded body cavity for holdout storage"]
        },
        {
            "name": "Identity Submersion Trigger",
            "cost": 25000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Allows a false identity to be perfectly assumed"]
        },
        {
            "name": "Immunofiltration System",
            "cost": 25000,
            "systemstrain": 2,
            "tl": 4,
            "details": ["Immune to almost all diseases and poisons"]
        },
        {
            "name": "Induced Coma Trigger",
            "cost": 20000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Feigns death and halts bodily processes for up to two weeks"]
        },
        {
            "name": "Neurointruder Alert",
            "cost": 50000,
            "systemstrain": 1,
            "tl": 5,
            "details": ["Grants +3 to save vs. telepathy, alerts of intrusion"]
        },
        {
            "name": "Panspectral Optics",
            "cost": 15000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Integral low-light and thermal vision"]
        },
        {
            "name": "Pressure Sheathing",
            "cost": 15000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Integral emergency vacc suit"]
        },
        {
            "name": "Prosthetic Limb",
            "cost": 2500,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Replaces a limb lost to misadventure"]
        },
        {
            "name": "Revenant Wiring",
            "cost": 50000,
            "systemstrain": 3,
            "tl": 5,
            "details": ["Keeps the user fighting even after they’re dead"]
        },
        {
            "name": "Slowtime Window",
            "cost": 30000,
            "systemstrain": 2,
            "tl": 5,
            "details": ["Prevents surprise and speeds up the user’s cogitation"]
        },
        {
            "name": "Stabilization Overrides",
            "cost": 25000,
            "systemstrain": 2,
            "tl": 4,
            "details": ["Automatically stabilizes a mortally-wounded user"]
        },
        {
            "name": "Tagger Nanites",
            "cost": 15000,
            "systemstrain": 1,
            "tl": 4,
            "details": ["Lets the user tag others with tracking nanites"]
        },
        {
            "name": "Twitchlock Actuators",
            "cost": 30000,
            "systemstrain": 2,
            "tl": 4,
            "details": ["Allows brief moments of hyper-precise accuracy"]
        }
    ]
};

// data that will be saved (contains all stuff that can't be derived from other values)
var charData = {
    "name": "",
    "class": "Expert",
    "species": "Human",
    "background": "",
    "homeworld": "",
    "xp": 0,
    "stats": { "cha": 0, "con": 0, "dex": 0, "int": 0, "str": 0, "wis": 0 },
    "hp": { "current": 0, "max": 0 },
    "systemstrain": 0,
    "effort": { "scene": 0, "day": 0, "other": 0 },
    "foci": [],
    "skills": [],
    "techniques": [],
    "weapons": [],
    "armor": [],
    "items": [],
    "money": 0,
    "debts": []
};

// non-saved data, contains derived values for easy access
var dynData = {
    "unsaved": false,
    "level": 1,
    "statmods": { "cha": 0, "con": 0, "dex": 0, "int": 0, "str": 0, "wis": 0 },
    "maxsystemstrain": 0,
    "attackbonus": 0,
    "saves": { "physical": 0, "evasion": 0, "mental": 0, "luck": 0 },
    "effort": { "current": 0, "max": 0 }
};

/******************************************************************************
                      Class check helper functions
******************************************************************************/

function isPsychic() {
    return charData.class.indexOf("Psychic") !== -1;
}

function isFullPsychic() {
    return charData.class == "Psychic";
}

function isPartialPsychic() {
    return isPsychic() && !isFullPsychic();
}

function isWarrior() {
    return charData.class.indexOf("Warrior") !== -1;
}

function isFullWarrior() {
    return charData.class == "Warrior";
}

function isPartialWarrior() {
    return isWarrior() && !isFullWarrior();
}

function isExpert() {
    return charData.class.indexOf("Expert") !== -1;
}

function isFullExpert() {
    return charData.class == "Expert";
}

function isPartialExpert() {
    return isExpert() && !isFullExpert();
}

/******************************************************************************
                        Skill type helper functions
******************************************************************************/

// change to check skill type in data (or change how this is queried)
function isPsychicSkill(name) {
    return name == "Biopsionics" || name == "Metapsionics" || name == "Precognition" || name == "Telekinesis" || name == "Telepathy" || name == "Teleportation";
}

/******************************************************************************
                     Functions to update derived values
******************************************************************************/

function updateLevel() {
    dynData.level = getLevelForXP(charData.xp);
    setContentByID("level", dynData.level);
    setContentByID("nextlevelxp", getXPForLevel(dynData.level + 1));
}

function updateSaves() {
    var basesave = 16 - dynData.level;
    dynData.saves.physical = basesave - Math.max(dynData.statmods.str, dynData.statmods.con);
    dynData.saves.evasion = basesave - Math.max(dynData.statmods.int, dynData.statmods.dex);
    dynData.saves.mental = basesave - Math.max(dynData.statmods.wis, dynData.statmods.cha);
    dynData.saves.luck = basesave;
    setContentByID("physicalsave", dynData.saves.physical);
    setContentByID("evasionsave", dynData.saves.evasion);
    setContentByID("mentalsave", dynData.saves.mental);
    setContentByID("lucksave", dynData.saves.luck);
}

function updateStatModifiers() {
    dynData.statmods.str = getModifierForStat(charData.stats.str);
    dynData.statmods.int = getModifierForStat(charData.stats.int);
    dynData.statmods.dex = getModifierForStat(charData.stats.dex);
    dynData.statmods.wis = getModifierForStat(charData.stats.wis);
    dynData.statmods.con = getModifierForStat(charData.stats.con);
    dynData.statmods.cha = getModifierForStat(charData.stats.cha);
    setContentByID("strmod", dynData.statmods.str);
    setContentByID("intmod", dynData.statmods.int);
    setContentByID("dexmod", dynData.statmods.dex);
    setContentByID("wismod", dynData.statmods.wis);
    setContentByID("conmod", dynData.statmods.con);
    setContentByID("chamod", dynData.statmods.cha);
}

function updateAttackBonus() {
    if (isFullWarrior()) {
        dynData.ab = dynData.level;
    }
    else {
        dynData.ab = Math.floor(dynData.level / 2);
        if (isPartialWarrior()) {
            ++dynData.ab; // +1 at first level
            if (dynData.level >= 5) {
                ++dynData.ab; // another +1 at 5th level
            }
        }
    }
    setContentByID("attackbonus", dynData.ab);
}

function updateSystemStrain() {
    dynData.maxsystemstrain = charData.stats.con;
    for (var i = 0; i < charData.cyberware.length; i++) {
        var cyberware = staticData.cyberware.find(x => x.name == charData.cyberware[i].name);
        dynData.maxsystemstrain -= cyberware.systemstrain;
    }
    setContentByID("maxsystemstrain", dynData.maxsystemstrain);
}

function updateMaxEffort() {
    var maxskill = 0;
    for (var i = 0; i < charData.skills.length; i++) {
        if (isPsychicSkill(charData.skills[i].name)) {
            maxskill = Math.max(maxskill, charData.skills[i].level);
        }
    }
    dynData.effort.max = 1 + Math.max(dynData.statmods.wis, dynData.statmods.con) + maxskill;
    setContentByID("maxeffort", dynData.effort.max);
}

function updateCurEffort() {
    dynData.effort.current = dynData.effort.max - charData.effort.scene - charData.effort.day - charData.effort.other;
    setContentByID("effort", dynData.effort.current);
}

function updateDerivedValues() {
    updateLevel();
    updateStatModifiers();
    updateSaves();
    updateAttackBonus();
    updateSystemStrain();
    updateMaxEffort();
    updateCurEffort();
}

/******************************************************************************
                     Functions to update detail blocks
******************************************************************************/

function updateClassDetails() {
    var detailstext = "<ul>";
    if (isFullExpert()) {
        detailstext += "<li>You gain a free level in a non-combat focus related to your background. Most concepts will take Specialist in their main skill, though Diplomat, Starfarer, Healer, or some other focus might suit better. You may not take a combat-oriented focus with this perk. In case of uncertainty, the GM decides whether or not a focus is permitted.</li>";
        detailstext += "<li>Once per scene, you can reroll a failed skill check, taking the new roll if it’s better.</li>";
        detailstext += "<li>When you advance an experience level, you gain a bonus skill point that can be spent on any non-combat, non-psychic skill. You can save this point to spend later if you wish.</li>";
    }
    else if (isFullPsychic()) {
        detailstext += "<li>Unlike Warriors or Experts, you are capable of learning psychic disciplines and their associated techniques, as described on page XX.</li>";
        detailstext += "<li>When you pick this class, choose any two psychic skills as bonus skills. You can pick the same one twice to obtain level-1 proficiency in it and a free level-1 technique from that discipline.</li>";
        detailstext += "<li>You have an Effort score, which can be used to fuel psychic abilities. Your maximum Effort is equal to 1 plus your highest psychic skill plus the better of your Wisdom or Constitution modifiers. Even with a penalty, your maximum Effort cannot be lower than 1.</li>";
    }
    else if (isFullWarrior()) {

        detailstext += "<li>You gain a free level in a combat-related focus associated with your background. The GM decides if a focus qualifies if it's an ambiguous case.</li>";
        detailstext += "<li>Warriors are lucky in combat. Once per fight, as an Instant ability, you can either choose to negate a successful attack roll against you or turn a missed attack roll you made into a successful hit. You can use this ability after the dice are rolled, but it cannot be used against environmental damage, effects without an attack roll, or hits on a vehicle you’re occupying.</li>";
        detailstext += "<li>You gain two extra maximum hit points at each character level.</li>";
    }
    else {
        if (isPartialExpert()) {
            detailstext += "<li>You gain a free level in a non-combat focus related to your background. Most concepts will take Specialist, though Diplomat, Starfarer, Healer, or some other focus might suit better. Gain an extra skill point every time you gain a character level which can be spent on any non-psychic, non-combat skill.</li>";
        }
        if (isPartialPsychic()) {
            detailstext += "<li>You are a restricted psychic. Pick one psychic discipline as a bonus skill at level-0. You can improve this skill with foci or skill points gained from advancing a level, but you cannot learn or improve any other psychic skill. Your maximum Effort equals 1 plus your highest psychic skill level plus the best of your Wisdom or Constitution modifiers, down to a minimum of 1.</li>";
        }
        if (isPartialWarrior()) {
            detailstext += "<li>You gain a free level in a combat focus related to your background. Gain +1 to your attack bonus at first and fifth levels. Gain 2 extra maximum hit points each level. Thus, at first level, you'd roll 1d6+2 for your maximum hit points. At second, you'd roll 2d6+4, and so forth.</li>";
        }
    }
    detailstext += "</ul>";
    setContentByID("classdetails", detailstext);
}

function updateFocusDetails() {
    // TODO
}

function updateSkillDetails() {
    // TODO
}

function updateWeaponDetails() {
    // TODO
}

function updateArmorDetails() {
    // TODO
}

function updateCyberwareDetails() {
    // TODO
}

function updateEquipmentDetails() {
    // TODO
}

function updatePsychicTechniqueDetails() {
    // TODO
}

function updateAllDetails() {
    updateClassDetails();
    updateFocusDetails();
    updateSkillDetails();
    updateWeaponDetails();
    updateArmorDetails();
    updateCyberwareDetails();
    updateEquipmentDetails();
    updatePsychicTechniqueDetails();
}

/******************************************************************************
                    Functions to add certain items (WIP)
******************************************************************************/

function addFocus(name, level, init) {
    var table = getFociTable();
    var row = table.insertRow(-1);
    var namecell = row.insertCell(-1);
    var levelcell = row.insertCell(-1);
    namecell.class = "fieldcontent";
    levelcell.class = "fieldcontent";
    setContent(namecell, name);
    setContent(levelcell, level);
    if (!init) {
        if (!chardata.foci) {
            charData.foci = [];
        }
        charData.foci.push({ "name": name, "level": level });
    }
}

function addSkill(name, level, init) {
    var table = getSkillTable();
    var row = table.insertRow(-1);
    var namecell = row.insertCell(-1);
    var levelcell = row.insertCell(-1);
    namecell.class = "fieldcontent";
    levelcell.class = "fieldcontent";
    setContent(namecell, name);
    setContent(levelcell, level);
    if (!init) {
        if (!chardata.skills) {
            charData.skills = [];
        }
        charData.skills.push({ "name": name, "level": level });
    }
}

function addPsychicTechnique(name, init) {
    var table = getTechniquesTable();
    var row = table.insertRow(-1);
    var namecell = row.insertCell(-1);
    namecell.class = "fieldcontent";
    setContent(namecell, name);
    if (!init) {
        if (!chardata.techniques) {
            charData.techniques = [];
        }
        charData.techniques.push(name);
    }
}

function addGoal(name, xp, init) {
    var table = getGoalTable();
    var row = table.insertRow(-1);
    var namecell = row.insertCell(-1);
    var xpcell = row.insertCell(-1);
    namecell.class = "fieldcontent";
    xpcell.class = "fieldcontent";
    setContent(namecell, name);
    setContent(xpcell, level);
    if (!init) {
        if (!chardata.goals) {
            charData.goals = [];
        }
        charData.goals.push({ "name": name, "xp": xp });
    }
}

function addArmor(armor, init) {
    var armordata = staticData.armor.find(x => x.name == armor.name);
    var table = getArmorTable();
    var row = table.insertRow(-1);
    var namecell = row.insertCell(-1);
    var accell = row.insertCell(-1);
    var encumbrancecell = row.insertCell(-1);
    var tlcell = row.insertCell(-1);
    var equippedcell = row.insertCell(-1);
    namecell.class = "fieldcontent";
    accell.class = "fieldcontentshort";
    encumbrancecell.class = "fieldcontentshort";
    tlcell.class = "fieldcontentshort";
    equippedcell.class = "fieldcontentshort";
    setContent(namecell, armor.name);
    setContent(accell, armordata.ac);
    setContent(encumbrancecell, armordata.encumbrance);
    setContent(tlcell, armordata.tl);
    setContent(equippedcell, armor.equipped);
    if (!init) {
        if (!chardata.armor) {
            charData.armor = [];
        }
        charData.armor.push(armor);
    }
}

function addWeapon(weapon, init) {
    var weapondata = staticData.weapons.find(x => x.name == weapon.name);
    var table = getWeaponTable();
    var row = table.insertRow(-1);
    var namecell = row.insertCell(-1);
    var dmgcell = row.insertCell(-1);
    var rangecell = row.insertCell(-1);
    var magazinecell = row.insertCell(-1);
    var attributecell = row.insertCell(-1);
    var encumbrancecell = row.insertCell(-1);
    var tlcell = row.insertCell(-1);
    var equippedcell = row.insertCell(-1);
    namecell.class = "fieldcontent";
    dmgcell.class = "fieldcontentshort";
    rangecell.class = "fieldcontentshort";
    magazinecell.class = "fieldcontentshort";
    attributecell.class = "fieldcontentshort";
    encumbrancecell.class = "fieldcontentshort";
    tlcell.class = "fieldcontentshort";
    equippedcell.class = "fieldcontentshort";
    setContent(namecell, weapon.name);
    setContent(dmgcell, weapondata.damage);
    setContent(rangecell, weapondata.range);
    setContent(magazinecell, weapondata.magazine);
    setContent(attributecell, weapondata.attribute);
    setContent(encumbrancecell, weapondata.encumbrance);
    setContent(tlcell, weapondata.tl);
    setContent(equippedcell, weapon.equipped);
    if (!init) {
        if (!chardata.weapons) {
            charData.weapons = [];
        }
        charData.weapons.push(weapon);
    }
}

function addEquipment(equipment, init) {
    var equipmentdata = staticData.equipment.find(x => x.name == equipment.name);
    var table = getEquipmentTable();
    var row = table.insertRow(-1);
    var namecell = row.insertCell(-1);
    var encumbrancecell = row.insertCell(-1);
    var equippedcell = row.insertCell(-1);
    namecell.class = "fieldcontent";
    encumbrancecell.class = "fieldcontentshort";
    equippedcell.class = "fieldcontentshort";
    setContent(namecell, equipment.name);
    setContent(encumbrancecell, equipmentdata.encumbrance);
    setContent(equippedcell, equipment.equipped);
    if (!init) {
        if (!chardata.equipment) {
            charData.equipment = [];
        }
        charData.equipment.push(equipment);
    }
}

function addCyberware(cyberware, init) {
    var table = getCyberwareTable();
    var row = table.insertRow(-1);
    var namecell = row.insertCell(-1);
    namecell.class = "fieldcontent";
    setContent(namecell, cyberware.name);
    if (!init) {
        if (!chardata.cyberware) {
            charData.cyberware = [];
        }
        charData.cyberware.push(cyberware);
    }
}

/******************************************************************************
                         Data change callbacks
******************************************************************************/

function onNameChanged() {
    charData.name = getContentByID("name");
    dataChanged();
}

function onClassChanged() {
    charData.class = getContentByID("class");
    dataChanged();
}

function onSpeciesChanged() {
    charData.species = getContentByID("species");
    dataChanged();
}

function onBackgroundChanged() {
    charData.background = getContentByID("background");
    dataChanged();
}

function onHomeworldChanged() {
    charData.homeworld = getContentByID("homeworld");
    dataChanged();
}

function onStrChanged() {
    charData.stats.str = getContentByID("str");
    dataChanged();
}

function onIntChanged() {
    charData.stats.int = getContentByID("int");
    dataChanged();
}

function onDexChanged() {
    charData.stats.dex = getContentByID("dex");
    dataChanged();
}

function onWisChanged() {
    charData.stats.wis = getContentByID("wis");
    dataChanged();
}

function onConChanged() {
    charData.stats.con = getContentByID("con");
    dataChanged();
}

function onChaChanged() {
    charData.stats.cha = getContentByID("cha");
    dataChanged();
}

function onXPChanged() {
    charData.xp = getContentByID("xp");
    dataChanged();
}

function onHPChanged() {
    charData.hp.current = getContentByID("hp");
    dataChanged();
}

function onMaxHPChanged() {
    charData.hp.max = getContentByID("maxhp");
    dataChanged();
}

function onSystemStrainChanged() {
    charData.systemstrain = getContentByID("systemstrain");
    dataChanged();
}

function onEffortChanged() {
    charData.effort.scene = getContentByID("effort_scene");
    charData.effort.day = getContentByID("effort_day");
    charData.effort.other = getContentByID("effort_other");
    dataChanged();
}

function onLongTermGoalChanged() {
    charData.goals.longterm = getContentByID("longtermgoal");
    dataChanged();
}

function onShortTermGoalChanged() {
    charData.goals.shortterm = getContentByID("shorttermgoal");
    dataChanged();
}

function onNotesChanged() {
    charData.notes = getContentByID("notes");
    dataChanged();
}

/******************************************************************************
                    Data updating, loading and saving
******************************************************************************/

function dataChanged() {
    if (isPsychic()) {
        setPsychicElementsDisplayStyle("");
    }
    else {
        setPsychicElementsDisplayStyle("none");
    }
    updateDerivedValues();
    updateAllDetails();
    // write updated data to local storage
    var json = JSON.stringify(charData);
    localStorage.setItem("swnchardata", json);
    dynData.unsaved = true;
    // TODO: set something to display "unsaved" state?
}

function fillCharSheet() {
    setContentByID("name", charData.name);
    setContentByID("class", charData.class);
    setContentByID("species", charData.species);
    setContentByID("background", charData.background);
    setContentByID("homeworld", charData.homeworld);
    setContentByID("xp", charData.xp);
    setContentByID("str", charData.stats.str);
    setContentByID("int", charData.stats.int);
    setContentByID("dex", charData.stats.dex);
    setContentByID("wis", charData.stats.wis);
    setContentByID("con", charData.stats.con);
    setContentByID("cha", charData.stats.cha);
    setContentByID("maxhp", charData.hp.max);
    setContentByID("hp", charData.hp.current);
    setContentByID("systemstrain", charData.systemstrain);
    setContentByID("effort_scene", charData.effort.scene);
    setContentByID("effort_day", charData.effort.day);
    setContentByID("effort_other", charData.effort.other);
    clearTable(getFociTable(), true);
    if (charData.foci) {
        for (var i = 0; i < charData.foci.length; i++) {
            addFocus(charData.foci[i].name, charData.foci[i].level, true);
        }
    }
    clearTable(getSkillTable(), true);
    if (charData.skills) {
        for (var i = 0; i < charData.skills.length; i++) {
            addSkill(charData.skills[i].name, charData.skills[i].level, true);
        }
    }
    if (charData.goals) {
        if (charData.goals.longterm) {
            setContentByID("longtermgoal", charData.goals.longterm);
        }
        if (charData.goals.shortterm) {
            setContentByID("shorttermgoal", charData.goals.shortterm);
        }
    }
    clearTable(getArmorTable(), true);
    if (charData.armor) {
        for (var i = 0; i < charData.armor.length; i++) {
            addArmor(charData.armor[i], true);
            // mods?
        }
    }
    clearTable(getWeaponTable(), true);
    if (charData.weapons) {
        for (var i = 0; i < charData.weapons.length; i++) {
            addWeapon(charData.weapons[i], true);
            // mods?
        }
    }
    clearTable(getEquipmentTable(), true);
    if (charData.equipment) {
        for (var i = 0; i < charData.equipment.length; i++) {
            addEquipment(charData.equipment[i], true);
        }
    }
    clearTable(getCyberwareTable(), true);
    if (charData.cyberware) {
        for (var i = 0; i < charData.cyberware.length; i++) {
            addCyberware(charData.cyberware[i], true);
        }
    }
    clearTable(getTechniquesTable(), true);
    if (charData.techniques) {
        for (var i = 0; i < charData.techniques.length; i++) {
            addPsychicTechnique(charData.techniques[i], true);
        }
    }
    if (charData.notes) {
        setContentByID("notes", charData.notes);
    }
    dataChanged();
}

function parseCharFile(json) {
    charData = JSON.parse(json);
    fillCharSheet();
}

function charFileLoaded(file) {
    parseCharFile(file.target.result);
}

function handleFileSelect(evt) {
    fr = new FileReader();
    fr.onload = charFileLoaded;
    fr.readAsText(evt.target.files[0]);
}

function getDataFromLocalStorage() {
    if (typeof (Storage) !== "undefined") {
        var storage = localStorage.getItem("swnchardata");
        if (storage) {
            parseCharFile(storage);
        }
    }
    else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}

function setupFileOpenButton() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        document.getElementById("file").addEventListener("change", handleFileSelect, false);
    }
    else {
        alert("The File APIs are not fully supported in this browser.");
    }
}

/******************************************************************************
                    Code that is executed on page load
******************************************************************************/

setupFileOpenButton();
getDataFromLocalStorage();
