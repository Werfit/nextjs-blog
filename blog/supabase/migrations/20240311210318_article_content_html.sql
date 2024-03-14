alter table "public"."articles" add column "content_html" text not null;

alter table "public"."articles" disable row level security;

alter table "public"."users" disable row level security;

create policy "Enable insert for authenticated users only"
on "public"."users"
as permissive
for insert
to public
with check (true);



