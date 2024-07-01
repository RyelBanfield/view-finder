create table "public"."albums" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "user_id" uuid not null
);
alter table "public"."albums" enable row level security;
CREATE UNIQUE INDEX albums_pkey ON public.albums USING btree (id);
alter table "public"."albums"
add constraint "albums_pkey" PRIMARY KEY using index "albums_pkey";
alter table "public"."albums"
add constraint "public_albums_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."albums" validate constraint "public_albums_user_id_fkey";
grant delete on table "public"."albums" to "anon";
grant insert on table "public"."albums" to "anon";
grant references on table "public"."albums" to "anon";
grant select on table "public"."albums" to "anon";
grant trigger on table "public"."albums" to "anon";
grant truncate on table "public"."albums" to "anon";
grant update on table "public"."albums" to "anon";
grant delete on table "public"."albums" to "authenticated";
grant insert on table "public"."albums" to "authenticated";
grant references on table "public"."albums" to "authenticated";
grant select on table "public"."albums" to "authenticated";
grant trigger on table "public"."albums" to "authenticated";
grant truncate on table "public"."albums" to "authenticated";
grant update on table "public"."albums" to "authenticated";
grant delete on table "public"."albums" to "service_role";
grant insert on table "public"."albums" to "service_role";
grant references on table "public"."albums" to "service_role";
grant select on table "public"."albums" to "service_role";
grant trigger on table "public"."albums" to "service_role";
grant truncate on table "public"."albums" to "service_role";
grant update on table "public"."albums" to "service_role";
create policy "Enable delete for users based on user_id" on "public"."albums" as permissive for delete to public using (
    (
        (
            SELECT auth.uid() AS uid
        ) = user_id
    )
);
create policy "Enable insert for authenticated users only" on "public"."albums" as permissive for
insert to authenticated with check (true);
create policy "Enable insert for users based on user_id" on "public"."albums" as permissive for
insert to public with check (
        (
            (
                SELECT auth.uid() AS uid
            ) = user_id
        )
    );
create policy "Enable read access for all users" on "public"."albums" as permissive for
select to public using (true);