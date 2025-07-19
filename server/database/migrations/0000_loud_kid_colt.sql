CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`members` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `team_rooms` (
	`team_id` text NOT NULL,
	`room_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`owner` text NOT NULL,
	`members` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_rooms` (
	`user_id` text NOT NULL,
	`room_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_teams` (
	`user_id` text NOT NULL,
	`team_id` text NOT NULL
);
