create table "public"."photos" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default auth.uid(),
    "album_id" uuid not null,
    "file_path" text not null
);
alter table "public"."photos" enable row level security;
CREATE UNIQUE INDEX photos_pkey ON public.photos USING btree (id);
alter table "public"."photos"
add constraint "photos_pkey" PRIMARY KEY using index "photos_pkey";
alter table "public"."photos"
add constraint "public_photos_album_id_fkey" FOREIGN KEY (album_id) REFERENCES albums(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."photos" validate constraint "public_photos_album_id_fkey";
alter table "public"."photos"
add constraint "public_photos_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;
alter table "public"."photos" validate constraint "public_photos_user_id_fkey";
grant delete on table "public"."photos" to "anon";
grant insert on table "public"."photos" to "anon";
grant references on table "public"."photos" to "anon";
grant select on table "public"."photos" to "anon";
grant trigger on table "public"."photos" to "anon";
grant truncate on table "public"."photos" to "anon";
grant update on table "public"."photos" to "anon";
grant delete on table "public"."photos" to "authenticated";
grant insert on table "public"."photos" to "authenticated";
grant references on table "public"."photos" to "authenticated";
grant select on table "public"."photos" to "authenticated";
grant trigger on table "public"."photos" to "authenticated";
grant truncate on table "public"."photos" to "authenticated";
grant update on table "public"."photos" to "authenticated";
grant delete on table "public"."photos" to "service_role";
grant insert on table "public"."photos" to "service_role";
grant references on table "public"."photos" to "service_role";
grant select on table "public"."photos" to "service_role";
grant trigger on table "public"."photos" to "service_role";
grant truncate on table "public"."photos" to "service_role";
grant update on table "public"."photos" to "service_role";
create policy "Enable delete for users based on user_id" on "public"."photos" as permissive for delete to public using (
    (
        (
            SELECT auth.uid() AS uid
        ) = user_id
    )
);
create policy "Enable insert for authenticated users only" on "public"."photos" as permissive for
insert to authenticated with check (true);
create policy "Enable insert for users based on user_id" on "public"."photos" as permissive for
insert to public with check (
        (
            (
                SELECT auth.uid() AS uid
            ) = user_id
        )
    );
create policy "Enable read access for all users" on "public"."photos" as permissive for
select to public using (true);