CREATE TABLE IF NOT EXISTS "sequences" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" bigint DEFAULT 1 NOT NULL,
	"name" varchar(100) DEFAULT 'short_url_sequence' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "short_urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"raw" varchar(2000) NOT NULL,
	"slug" varchar(16) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
