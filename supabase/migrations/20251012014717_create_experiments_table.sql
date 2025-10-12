/*
  # Create Web Page Designing Lab Experiments Database

  ## Overview
  This migration sets up the database structure for storing web page designing lab experiments,
  including questions, solutions, and code examples.

  ## New Tables
  
  ### `experiments`
  - `id` (uuid, primary key) - Unique identifier for each experiment
  - `unit_number` (integer) - Unit number (1 or 2)
  - `experiment_number` (integer) - Experiment number within the unit
  - `title` (text) - Experiment title
  - `question` (text) - Full experiment question/requirement
  - `description` (text) - Additional description or learning objectives
  - `solution_html` (text) - HTML code solution
  - `solution_css` (text) - CSS code solution (if applicable)
  - `solution_explanation` (text) - Explanation of the solution
  - `key_concepts` (text array) - Array of key concepts covered
  - `difficulty_level` (text) - Easy, Medium, or Hard
  - `created_at` (timestamptz) - Timestamp of creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ## Security
  - Enable RLS on `experiments` table
  - Add policy for public read access (educational content)
*/

CREATE TABLE IF NOT EXISTS experiments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_number integer NOT NULL,
  experiment_number integer NOT NULL,
  title text NOT NULL,
  question text NOT NULL,
  description text,
  solution_html text NOT NULL,
  solution_css text,
  solution_explanation text NOT NULL,
  key_concepts text[] DEFAULT '{}',
  difficulty_level text DEFAULT 'Medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view experiments"
  ON experiments
  FOR SELECT
  TO public
  USING (true);
