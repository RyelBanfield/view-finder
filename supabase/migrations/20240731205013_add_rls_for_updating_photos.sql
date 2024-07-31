create policy "Enable update for all users" on "public"."photos" as permissive for
update to public using (true);