/*
  # Create tasks table with user authentication

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key) - unique identifier for each task
      - `user_id` (uuid, foreign key) - references auth.users table
      - `title` (text) - task title/description
      - `priority` (text) - task priority: 'low', 'medium', 'high'
      - `status` (text) - task status: 'pending', 'in-progress', 'done'
      - `created_at` (timestamptz) - timestamp when task was created
      - `updated_at` (timestamptz) - timestamp when task was last updated

  2. Security
    - Enable RLS on `tasks` table
    - Add policy for users to view their own tasks
    - Add policy for users to insert their own tasks
    - Add policy for users to update their own tasks
    - Add policy for users to delete their own tasks

  3. Constraints
    - Priority must be one of: 'low', 'medium', 'high'
    - Status must be one of: 'pending', 'in-progress', 'done'
    - Title cannot be empty
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL CHECK (length(trim(title)) > 0),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'done')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks(user_id);
CREATE INDEX IF NOT EXISTS tasks_status_idx ON tasks(status);
CREATE INDEX IF NOT EXISTS tasks_created_at_idx ON tasks(created_at DESC);
