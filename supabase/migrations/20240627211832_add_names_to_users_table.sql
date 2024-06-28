alter table "public"."users"
add column "first_name" text;
alter table "public"."users"
add column "last_name" text;
alter table "public"."users"
add column "username" text;
CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);
alter table "public"."users"
add constraint "users_username_key" UNIQUE using index "users_username_key";
create policy "Enable read access for all users" on "public"."users" as permissive for
select to public using (true);
create policy "Enable update for users based on email" on "public"."users" as permissive for
update to public using (
        (
            (
                (
                    SELECT auth.jwt() AS jwt
                )->>'email'::text
            ) = email
        )
    ) with check (
        (
            (
                (
                    SELECT auth.jwt() AS jwt
                )->>'email'::text
            ) = email
        )
    );