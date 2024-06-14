create table "public"."users" (
  "id" uuid not null default auth.uid(),
  "created_at" timestamp with time zone not null default now(),
  "email" text not null
);
alter table "public"."users" enable row level security;
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);
alter table "public"."users"
add constraint "users_pkey" PRIMARY KEY using index "users_pkey";
alter table "public"."users"
add constraint "public_users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;
alter table "public"."users" validate constraint "public_users_id_fkey";
alter table "public"."users"
add constraint "users_email_key" UNIQUE using index "users_email_key";
set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.create_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $function$begin
insert into public.users (id, email)
values (new.id, new.email);
return new;
end;
$function$;
CREATE TRIGGER auth_create_user
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION create_user();
grant delete on table "public"."users" to "anon";
grant insert on table "public"."users" to "anon";
grant references on table "public"."users" to "anon";
grant select on table "public"."users" to "anon";
grant trigger on table "public"."users" to "anon";
grant truncate on table "public"."users" to "anon";
grant update on table "public"."users" to "anon";
grant delete on table "public"."users" to "authenticated";
grant insert on table "public"."users" to "authenticated";
grant references on table "public"."users" to "authenticated";
grant select on table "public"."users" to "authenticated";
grant trigger on table "public"."users" to "authenticated";
grant truncate on table "public"."users" to "authenticated";
grant update on table "public"."users" to "authenticated";
grant delete on table "public"."users" to "service_role";
grant insert on table "public"."users" to "service_role";
grant references on table "public"."users" to "service_role";
grant select on table "public"."users" to "service_role";
grant trigger on table "public"."users" to "service_role";
grant truncate on table "public"."users" to "service_role";
grant update on table "public"."users" to "service_role";