alter table "public"."favorites" drop constraint "favorites_article_id_fkey";

alter table "public"."favorites" drop constraint "favorites_user_id_fkey";

alter table "public"."favorites" drop column "article_id";

alter table "public"."favorites" drop column "user_id";

alter table "public"."favorites" add column "article" uuid not null;

alter table "public"."favorites" add column "user" uuid not null;

alter table "public"."favorites" add constraint "favorites_article_fkey" FOREIGN KEY (article) REFERENCES articles(id) ON DELETE CASCADE not valid;

alter table "public"."favorites" validate constraint "favorites_article_fkey";

alter table "public"."favorites" add constraint "favorites_user_fkey" FOREIGN KEY ("user") REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."favorites" validate constraint "favorites_user_fkey";


