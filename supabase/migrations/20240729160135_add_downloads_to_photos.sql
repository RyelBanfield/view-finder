alter table "public"."photos"
add column "downloads" smallint not null default '0'::smallint;