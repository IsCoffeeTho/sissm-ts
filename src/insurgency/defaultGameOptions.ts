const defaultGameOptions = {
	path: `${process.platform == "win32" ? `C:\\Program Files (x86)\\Steam\\steamapps\\common` : `${process.env["HOME"]}/.steam/SteamApps/common`}/sandstorm_server`,
	hostname: "127.0.0.1",
	port: 27102,
	queryPort: 27131,
	/** Configure the game server */
	gameSettings: {
		cheats: false,
		/** Which maps are possible to be displayed in the vote menu
		 * @type string[] | BunFile
		 */
		mapCycle: [],
		/** General server settings. */
		general: {
			/** Enables the kill feed. */
			killFeed: false,
			/** Enables the kill feed for dedicated spectators and replays. */
			killFeedSpectator: true,
			/** Show information about a death (killer, weapon) to the victim. */
			killerInfo: true,
			/** Reveal distance of kills. */
			killerInfoRevealDistance: false,
			/** Limit for the number of team kills one player can perform before being kicked. */
			teamKillLimit: 3,
			/** Grace timer (in seconds) between timer killing incidents. */
			teamKillGrace: 0.2,
			/** How long (in seconds) until a player's TK count reduces by 1. */
			teamKillReduceTime: 90,
			/** Allow alive players to see messages from the dead. */
			deadSay: false,
			/** Allow alive players to see messages from dead teammates using team-only chat. */
			deadSayTeam: true,
			/** Allow alive players to hear voice chat from dead players. */
			voiceAllowDeadChat: false,
			/** Allow proximity voice chat to be heard by enemies. */
			voiceEnemyHearsLocal: true,
			/** The additional time to wait for additional players during the starting intermission. */
			gameStartingIntermissionTime: 5,
			/** How long players are frozen before transitioning to the round intermission screen. */
			winTime: 5,
			/** How long is spent on the intermission screen. */
			postRoundTime: 15,
			/** How much time is spent between last post round and game over. */
			postGameTime: 15,
			/** Assign player to a team on connection to the server. */
			autoAssignTeams: true,
			/** Enables friendly fire. */
			allowFriendlyFire: true,
			/** Damage modifier for friendly fire. */
			friendlyFireModifier: 0.2,
			/** Damage modifier for friendly fire that is mirrored back at the attacker */
			friendlyFireReflect: 0,
			/** Enables auto team balancing. */
			autoBalanceTeams: true,
			/** How long to wait after detecting unbalanced teams. */
			autoBalanceDelay: 10,
			/** Enabled map voting at the end of each game. */
			mapVoting: true,
			/** Enables the use of the map cycle. If disabled, the current map loops indefinitely. */
			useMapCycle: true,
			/** Allow both teams to talk to each other between rounds. */
			voiceIntermissionAllowAll: true,
			/** How long a player can be idle for before being kicked. */
			idleLimit: 150,
			/** How long a player can idle for when there are low reinforcements. */
			idleLimitLowReinforcements: 90,
			/** How frequently to check for idle players. */
			idleCheckFrequency: 30,
		},
		AI: {
			/** Enables the ability for bots to maneuver side to side */
			allowStrafing: false,
			/**  */
			acceptPartialPaths: true,
			/** BTAI? */
			enableBTAITasks: false,
			/**  */
			finishMoveOnGoalOverlap: false,
			/**  */
			allowStrafe: true,
			/**  */
			LOSflag: true,
			/**  */
			skipExtraLOSChecks: false,
			/**  */
			wantsPlayerState: true,
			/**  */
			advancedTactics: true,
			/**  */
			setControlRotationFromPawnOrientation: true,
			/** cm */
			hearingRange: 768,
			/** cm */
			LoSHearingRange: 1500,
			/** cm */
			sightRadius: 3000,
			/** cm */
			loseSightRadius: 3500,
			/**  */
			peripheralVisionAngle: 360,
			/**  */
			peripheralVisionAngleDegrees: 360,
			/**  */
			autoSuccessRangeFromLastSeenLocation: 500,
			/** Time between AI Environment checks
			 * ## `WARNING INTENSIVE` */
			queryCountWarningInterval: 5.0,
		},
		gameplay: {
			/** How long it takes to capture territorial objectives. Negative value follows the maps recommended.  */
			objectiveCaptureTime: -1,
			/** How long objective progress decays with no one on point. Negative value disables. */
			objectiveResetTime: -1,
			/** Additional capture speed-up for each player on the point. */
			objectiveSpeedup: 0.25,
			/** Maximum players taken into account for capture speed-up. */
			objectiveMaxSpeedupPlayers: 4,
			/** Minimum players required on each team to start the game. */
			minimumPlayers: 1,
			/** Maximum number of rounds to play. Negative value follows the maps recommended. */
			roundLimit: -1,
			/** Number of rounds required for game victory. Negative value follows the maps recommended. */
			winLimit: -1,
			/** Meximum duration a game can last. Negative value disables. */
			gameTimeLimit: -1,
			/** Amount of "freeze time" at the start of a round. */
			preroundTime: 10,
			/** Amount of overtime given when there's an objective being contested after the round timer expires. */
			overTime: 60,
			/** Minimum additional time spent between team switches. */
			teamSwitchTime: 10,
			/** How often to switch teams. Negative values follow the maps recommended. */
			switchTeamsEveryRound: -1,
			/** Allow players to switch to the other team */
			allowPlayerTeamSelect: true,
			/** Enables bots */
			bots: false,
			/** Bot quota to fill. Negative values follows the maps recommended. */
			botQuota: -1,
			/** Amount of starting supply points. */
			initalSupply: 15,
			/** Maximum supply that can be earned. */
			maximumSupply: 15,
			/** Enable supply gain throughout the round. */
			supplyGainEnabled: false,
			/** Supply gain will be awarded instantly. */
			awardSupplyInstantly: false,
			/** Score threshold for earning supply. */
			supplyGainFrequency: 150,
			/** Players vs Bots mode settings */
			coop: {
				/** Use vehicle insertion sequences where possible */
				useVehicleInsertion: true,
				/** Friendly bots for coop */
				friendlyBotQuota: 4,
				/** Minimum number of enemy bots */
				minimumEnemies: 6,
				/** Maximum number of enemy bots */
				maximumEnemies: 12,
			},
		},
		mutators: {
			vampirism: {
				countFriendlyFire: false,
				maxHealth:1000
			},
			
		},
		gamemodes: {
			push: {
				/** How long a round is extended for each successful capture */
				roundTimeExtension: 300,
				/** Number of waves attackers get per-objective */
				attackerWavesPerObjective: 5,
				/** Percentage of attacker team that has to be dead to trigger a reinforcement wave */
				attackerWaveDPR: 0.25,
				/** Duration of attacker reinforcement wave timer */
				attackerWaveTimer: 20,
				/** Number of waves attackers get per-objective */
				defenderWavesPerObjective: 5,
				/** Percentage of defending team that has to be dead to trigger a reinforcement wave */
				defenderWaveDPR: 0.25,
				/** Duration of defender reinforcement wave timer */
				defenderWaveTimer: 35,
				/** Delay for the last defender */
				lastStandSetupDelay: 10,
				/** Delay in advancing the attacker spawns */
				advanceAttackerSpawnsDelay: 30,
			},
			skirmish: {
				/** Starting reinforcement waves for each team */
				defaultReinforcementWaves: 5,
				/** Number of bonus waves to get when an objective is taken while the team cache is still intact */
				captureBonusWaves: 1,
			},
			firefight: {},
			checkpoint: {
				/** Time to defend against counter attack with smallplayer team. */
				defendTimer: 90,
				/** Extend duration of counter-attack by this on thefinal point. */
				defendTimerFinal: 180,
				/** Time to force bots to retreat after a counter-attack. */
				retreatTimer: 10,
				/** “Dead player ratio” that mustbe reached before respawning the bot team. */
				respawnDPR: 0.1,
				/** Bot respawn delay. */
				respawnDelay: 20,
				/** Time bots will rush thecache after destruction. */
				postCaptureRushTimer: 30,
				/** “Dead player ratio” that must be reached before respawning the bot teamduring a counter-attack. */
				counterAttackRespawnDPR: 0.2,
				/** Bot respawn delay duringcounter-attack. */
				counterAttackRespawnDelay: 20,
				/** Multiplier of bots to respawn with minimum player count. */
				objectiveTotalEnemyRespawnMultiplierMin: 1,
				/** Multiplier of bots to respawn with maximum player count. */
				objectiveTotalEnemyRespawnMultiplierMax: 1,
				/** Increase in bot quota for final objective if it’s a cache */
				finalCacheBotQuotaMultiplier: 1.5,
			},
		},
	},
};

export default defaultGameOptions;
