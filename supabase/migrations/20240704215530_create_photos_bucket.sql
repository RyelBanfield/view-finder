alter table "public"."users"
add column "max_photos" smallint not null default '5'::smallint;
create policy "Enable delete for authenticated users only 1io9m69_0" on "storage"."objects" as permissive for delete to authenticated using ((bucket_id = 'photos'::text));
create policy "Enable delete for authenticated users only 1io9m69_1" on "storage"."objects" as permissive for
select to authenticated using ((bucket_id = 'photos'::text));
create policy "Enable insert for authenticated users only 1io9m69_0" on "storage"."objects" as permissive for
insert to authenticated with check ((bucket_id = 'photos'::text));