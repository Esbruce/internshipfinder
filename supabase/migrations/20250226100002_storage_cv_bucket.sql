-- Storage bucket for CV/resume uploads (user-private)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cv-uploads',
  'cv-uploads',
  false,
  5242880,
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do nothing;

-- RLS: users can read/upload/update/delete only their own files (path = user_id/filename)
create policy "Users can read own CVs"
  on storage.objects for select
  using (bucket_id = 'cv-uploads' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can upload own CVs"
  on storage.objects for insert
  with check (bucket_id = 'cv-uploads' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update own CVs"
  on storage.objects for update
  using (bucket_id = 'cv-uploads' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete own CVs"
  on storage.objects for delete
  using (bucket_id = 'cv-uploads' and (storage.foldername(name))[1] = auth.uid()::text);
