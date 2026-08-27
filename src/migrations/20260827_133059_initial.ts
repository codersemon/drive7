import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_type" AS ENUM('text', 'image', 'button');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_variant" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_object_fit" AS ENUM('contain', 'cover', 'fill');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_desktop_visibility" AS ENUM('visible', 'hidden');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_desktop_anchor" AS ENUM('tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_desktop_font_weight" AS ENUM('100', '200', '300', '400', '500', '600', '700', '900');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_desktop_align" AS ENUM('right', 'center', 'left');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_tablet_visibility" AS ENUM('inherit', 'visible', 'hidden');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_tablet_anchor" AS ENUM('tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_tablet_font_weight" AS ENUM('100', '200', '300', '400', '500', '600', '700', '900');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_tablet_align" AS ENUM('right', 'center', 'left');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_mobile_visibility" AS ENUM('inherit', 'visible', 'hidden');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_mobile_anchor" AS ENUM('tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_mobile_font_weight" AS ENUM('100', '200', '300', '400', '500', '600', '700', '900');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_mobile_align" AS ENUM('right', 'center', 'left');
  CREATE TYPE "public"."enum_pages_blocks_canvas_section_layers_animation" AS ENUM('none', 'fade', 'up', 'down', 'left', 'right');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_type" AS ENUM('text', 'image', 'button');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_variant" AS ENUM('solid', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_object_fit" AS ENUM('contain', 'cover', 'fill');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_desktop_visibility" AS ENUM('visible', 'hidden');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_desktop_anchor" AS ENUM('tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_desktop_font_weight" AS ENUM('100', '200', '300', '400', '500', '600', '700', '900');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_desktop_align" AS ENUM('right', 'center', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_tablet_visibility" AS ENUM('inherit', 'visible', 'hidden');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_tablet_anchor" AS ENUM('tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_tablet_font_weight" AS ENUM('100', '200', '300', '400', '500', '600', '700', '900');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_tablet_align" AS ENUM('right', 'center', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_mobile_visibility" AS ENUM('inherit', 'visible', 'hidden');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_mobile_anchor" AS ENUM('tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_mobile_font_weight" AS ENUM('100', '200', '300', '400', '500', '600', '700', '900');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_mobile_align" AS ENUM('right', 'center', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_canvas_section_layers_animation" AS ENUM('none', 'fade', 'up', 'down', 'left', 'right');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'twitter', 'instagram', 'whatsapp', 'snapchat', 'tiktok', 'youtube', 'linkedin');
  CREATE TYPE "public"."enum_site_settings_direction" AS ENUM('rtl', 'ltr');
  CREATE TABLE "pages_blocks_canvas_section_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_canvas_section_layers_type" DEFAULT 'text',
  	"label" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"variant" "enum_pages_blocks_canvas_section_layers_variant" DEFAULT 'solid',
  	"href" varchar,
  	"new_tab" boolean DEFAULT false,
  	"image_id" integer,
  	"image_alt" varchar,
  	"object_fit" "enum_pages_blocks_canvas_section_layers_object_fit" DEFAULT 'contain',
  	"desktop_visibility" "enum_pages_blocks_canvas_section_layers_desktop_visibility" DEFAULT 'visible',
  	"desktop_anchor" "enum_pages_blocks_canvas_section_layers_desktop_anchor" DEFAULT 'mc',
  	"desktop_x" numeric DEFAULT 0,
  	"desktop_y" numeric DEFAULT 0,
  	"desktop_w" numeric,
  	"desktop_h" numeric,
  	"desktop_font_size" numeric,
  	"desktop_line_height" numeric,
  	"desktop_font_weight" "enum_pages_blocks_canvas_section_layers_desktop_font_weight",
  	"desktop_letter_spacing" numeric,
  	"desktop_align" "enum_pages_blocks_canvas_section_layers_desktop_align",
  	"desktop_color" varchar,
  	"tablet_visibility" "enum_pages_blocks_canvas_section_layers_tablet_visibility" DEFAULT 'inherit',
  	"tablet_anchor" "enum_pages_blocks_canvas_section_layers_tablet_anchor",
  	"tablet_x" numeric,
  	"tablet_y" numeric,
  	"tablet_w" numeric,
  	"tablet_h" numeric,
  	"tablet_font_size" numeric,
  	"tablet_line_height" numeric,
  	"tablet_font_weight" "enum_pages_blocks_canvas_section_layers_tablet_font_weight",
  	"tablet_letter_spacing" numeric,
  	"tablet_align" "enum_pages_blocks_canvas_section_layers_tablet_align",
  	"tablet_color" varchar,
  	"mobile_visibility" "enum_pages_blocks_canvas_section_layers_mobile_visibility" DEFAULT 'inherit',
  	"mobile_anchor" "enum_pages_blocks_canvas_section_layers_mobile_anchor",
  	"mobile_x" numeric,
  	"mobile_y" numeric,
  	"mobile_w" numeric,
  	"mobile_h" numeric,
  	"mobile_font_size" numeric,
  	"mobile_line_height" numeric,
  	"mobile_font_weight" "enum_pages_blocks_canvas_section_layers_mobile_font_weight",
  	"mobile_letter_spacing" numeric,
  	"mobile_align" "enum_pages_blocks_canvas_section_layers_mobile_align",
  	"mobile_color" varchar,
  	"animation" "enum_pages_blocks_canvas_section_layers_animation" DEFAULT 'none',
  	"delay" numeric DEFAULT 0
  );
  
  CREATE TABLE "pages_blocks_canvas_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background" varchar,
  	"desktop_height" numeric DEFAULT 740,
  	"tablet_height" numeric DEFAULT 700,
  	"mobile_height" numeric DEFAULT 740,
  	"hide_on_desktop" boolean DEFAULT false,
  	"hide_on_tablet" boolean DEFAULT false,
  	"hide_on_mobile" boolean DEFAULT false,
  	"full_bleed" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"show_design_controls" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_canvas_section_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_canvas_section_layers_type" DEFAULT 'text',
  	"label" varchar,
  	"text" varchar,
  	"button_label" varchar,
  	"variant" "enum__pages_v_blocks_canvas_section_layers_variant" DEFAULT 'solid',
  	"href" varchar,
  	"new_tab" boolean DEFAULT false,
  	"image_id" integer,
  	"image_alt" varchar,
  	"object_fit" "enum__pages_v_blocks_canvas_section_layers_object_fit" DEFAULT 'contain',
  	"desktop_visibility" "enum__pages_v_blocks_canvas_section_layers_desktop_visibility" DEFAULT 'visible',
  	"desktop_anchor" "enum__pages_v_blocks_canvas_section_layers_desktop_anchor" DEFAULT 'mc',
  	"desktop_x" numeric DEFAULT 0,
  	"desktop_y" numeric DEFAULT 0,
  	"desktop_w" numeric,
  	"desktop_h" numeric,
  	"desktop_font_size" numeric,
  	"desktop_line_height" numeric,
  	"desktop_font_weight" "enum__pages_v_blocks_canvas_section_layers_desktop_font_weight",
  	"desktop_letter_spacing" numeric,
  	"desktop_align" "enum__pages_v_blocks_canvas_section_layers_desktop_align",
  	"desktop_color" varchar,
  	"tablet_visibility" "enum__pages_v_blocks_canvas_section_layers_tablet_visibility" DEFAULT 'inherit',
  	"tablet_anchor" "enum__pages_v_blocks_canvas_section_layers_tablet_anchor",
  	"tablet_x" numeric,
  	"tablet_y" numeric,
  	"tablet_w" numeric,
  	"tablet_h" numeric,
  	"tablet_font_size" numeric,
  	"tablet_line_height" numeric,
  	"tablet_font_weight" "enum__pages_v_blocks_canvas_section_layers_tablet_font_weight",
  	"tablet_letter_spacing" numeric,
  	"tablet_align" "enum__pages_v_blocks_canvas_section_layers_tablet_align",
  	"tablet_color" varchar,
  	"mobile_visibility" "enum__pages_v_blocks_canvas_section_layers_mobile_visibility" DEFAULT 'inherit',
  	"mobile_anchor" "enum__pages_v_blocks_canvas_section_layers_mobile_anchor",
  	"mobile_x" numeric,
  	"mobile_y" numeric,
  	"mobile_w" numeric,
  	"mobile_h" numeric,
  	"mobile_font_size" numeric,
  	"mobile_line_height" numeric,
  	"mobile_font_weight" "enum__pages_v_blocks_canvas_section_layers_mobile_font_weight",
  	"mobile_letter_spacing" numeric,
  	"mobile_align" "enum__pages_v_blocks_canvas_section_layers_mobile_align",
  	"mobile_color" varchar,
  	"animation" "enum__pages_v_blocks_canvas_section_layers_animation" DEFAULT 'none',
  	"delay" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_canvas_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background" varchar,
  	"desktop_height" numeric DEFAULT 740,
  	"tablet_height" numeric DEFAULT 700,
  	"mobile_height" numeric DEFAULT 740,
  	"hide_on_desktop" boolean DEFAULT false,
  	"hide_on_tablet" boolean DEFAULT false,
  	"hide_on_mobile" boolean DEFAULT false,
  	"full_bleed" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_show_design_controls" boolean DEFAULT false,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_svg" varchar,
  	"logo_href" varchar DEFAULT '/',
  	"logo_width_desktop" numeric DEFAULT 186,
  	"logo_width_tablet" numeric DEFAULT 186,
  	"logo_width_mobile" numeric DEFAULT 119,
  	"logo_offset_y_desktop" numeric DEFAULT -4,
  	"logo_offset_y_widescreen" numeric DEFAULT -1,
  	"logo_offset_y_mobile" numeric DEFAULT -2,
  	"logo_margin_left_widescreen" numeric DEFAULT 46,
  	"logo_margin_right_widescreen" numeric DEFAULT 136,
  	"nav_shift_widescreen" numeric DEFAULT 178,
  	"background" varchar DEFAULT '#000000',
  	"link_color" varchar DEFAULT '#706E6E',
  	"link_active_color" varchar DEFAULT '#706E6E',
  	"link_font_size" numeric DEFAULT 20,
  	"link_line_height" numeric DEFAULT 30,
  	"link_padding_x" numeric DEFAULT 14,
  	"link_padding_y" numeric DEFAULT 13,
  	"nav_width_percent" numeric DEFAULT 62.6,
  	"logo_gap" numeric DEFAULT 35,
  	"height_widescreen" numeric DEFAULT 91.7,
  	"height_desktop" numeric DEFAULT 194.7,
  	"height_tablet" numeric DEFAULT 194,
  	"height_mobile" numeric DEFAULT 61,
  	"sticky" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"separator" varchar DEFAULT '|',
  	"background" varchar DEFAULT '#3D3D3D',
  	"icon_color" varchar DEFAULT '#FFFFFF',
  	"link_color" varchar DEFAULT '#FFFFFF',
  	"overlay_color" varchar DEFAULT '#0A0D14',
  	"overlay_opacity" numeric DEFAULT 0.7,
  	"icon_box_size" numeric DEFAULT 32.4,
  	"icon_size" numeric DEFAULT 18,
  	"link_font_size" numeric DEFAULT 18,
  	"pad_top_desktop" numeric DEFAULT 120,
  	"pad_bottom_desktop" numeric DEFAULT 160,
  	"side_offset_desktop" numeric DEFAULT 120,
  	"gutter_desktop" numeric DEFAULT 80,
  	"pad_top_tablet" numeric DEFAULT 60,
  	"pad_bottom_tablet" numeric DEFAULT 80,
  	"side_offset_tablet" numeric DEFAULT 60,
  	"gutter_tablet" numeric DEFAULT 20,
  	"pad_top_mobile" numeric DEFAULT 60,
  	"pad_bottom_mobile" numeric DEFAULT 40,
  	"side_offset_mobile" numeric DEFAULT 0,
  	"gutter_mobile" numeric DEFAULT 20,
  	"links_margin_top" numeric DEFAULT 15,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Drive7',
  	"site_url" varchar DEFAULT 'https://drive7.com',
  	"locale" varchar DEFAULT 'ar',
  	"direction" "enum_site_settings_direction" DEFAULT 'rtl',
  	"theme_color" varchar DEFAULT '#000000',
  	"body_background" varchar DEFAULT '#000000',
  	"favicon_id" integer,
  	"default_title" varchar,
  	"title_template" varchar,
  	"default_description" varchar,
  	"default_og_image_id" integer,
  	"whatsapp_enabled" boolean DEFAULT true,
  	"whatsapp_number" varchar DEFAULT '966920000057',
  	"whatsapp_color" varchar DEFAULT '#25D366',
  	"whatsapp_size" numeric DEFAULT 55,
  	"whatsapp_icon_size" numeric DEFAULT 35,
  	"whatsapp_inset" numeric DEFAULT 18,
  	"gtm_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_canvas_section_layers" ADD CONSTRAINT "pages_blocks_canvas_section_layers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_canvas_section_layers" ADD CONSTRAINT "pages_blocks_canvas_section_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_canvas_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_canvas_section" ADD CONSTRAINT "pages_blocks_canvas_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_canvas_section_layers" ADD CONSTRAINT "_pages_v_blocks_canvas_section_layers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_canvas_section_layers" ADD CONSTRAINT "_pages_v_blocks_canvas_section_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_canvas_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_canvas_section" ADD CONSTRAINT "_pages_v_blocks_canvas_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_canvas_section_layers_order_idx" ON "pages_blocks_canvas_section_layers" USING btree ("_order");
  CREATE INDEX "pages_blocks_canvas_section_layers_parent_id_idx" ON "pages_blocks_canvas_section_layers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_canvas_section_layers_image_idx" ON "pages_blocks_canvas_section_layers" USING btree ("image_id");
  CREATE INDEX "pages_blocks_canvas_section_order_idx" ON "pages_blocks_canvas_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_canvas_section_parent_id_idx" ON "pages_blocks_canvas_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_canvas_section_path_idx" ON "pages_blocks_canvas_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_canvas_section_layers_order_idx" ON "_pages_v_blocks_canvas_section_layers" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_canvas_section_layers_parent_id_idx" ON "_pages_v_blocks_canvas_section_layers" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_canvas_section_layers_image_idx" ON "_pages_v_blocks_canvas_section_layers" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_canvas_section_order_idx" ON "_pages_v_blocks_canvas_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_canvas_section_parent_id_idx" ON "_pages_v_blocks_canvas_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_canvas_section_path_idx" ON "_pages_v_blocks_canvas_section" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_links_order_idx" ON "footer_links" USING btree ("_order");
  CREATE INDEX "footer_links_parent_id_idx" ON "footer_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_canvas_section_layers" CASCADE;
  DROP TABLE "pages_blocks_canvas_section" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_canvas_section_layers" CASCADE;
  DROP TABLE "_pages_v_blocks_canvas_section" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_type";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_variant";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_object_fit";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_desktop_visibility";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_desktop_anchor";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_desktop_font_weight";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_desktop_align";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_tablet_visibility";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_tablet_anchor";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_tablet_font_weight";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_tablet_align";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_mobile_visibility";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_mobile_anchor";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_mobile_font_weight";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_mobile_align";
  DROP TYPE "public"."enum_pages_blocks_canvas_section_layers_animation";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_type";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_variant";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_object_fit";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_desktop_visibility";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_desktop_anchor";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_desktop_font_weight";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_desktop_align";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_tablet_visibility";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_tablet_anchor";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_tablet_font_weight";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_tablet_align";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_mobile_visibility";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_mobile_anchor";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_mobile_font_weight";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_mobile_align";
  DROP TYPE "public"."enum__pages_v_blocks_canvas_section_layers_animation";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_site_settings_direction";`)
}
