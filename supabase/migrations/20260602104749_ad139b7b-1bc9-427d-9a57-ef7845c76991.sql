-- Helper: is staff?
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin','manager','sales_executive','operations','insurance_executive','mf_executive')
  )
$$;

-- Extend leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS lead_name text,
  ADD COLUMN IF NOT EXISTS pan text,
  ADD COLUMN IF NOT EXISTS aadhaar text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS lead_source text,
  ADD COLUMN IF NOT EXISTS assigned_to uuid;

CREATE POLICY "Staff read all leads" ON public.leads FOR SELECT
  USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff update leads" ON public.leads FOR UPDATE
  USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff insert leads" ON public.leads FOR INSERT
  WITH CHECK (public.is_staff(auth.uid()));

-- Customers
CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  customer_name text NOT NULL,
  mobile text,
  email text,
  pan text,
  aadhaar text,
  address text,
  occupation text,
  income numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage customers" ON public.customers FOR ALL
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Loan Cases
CREATE TABLE public.loan_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES public.customers(id) ON DELETE CASCADE,
  loan_type text NOT NULL,
  loan_amount numeric,
  lender_name text,
  stage text NOT NULL DEFAULT 'Lead',
  sanction_amount numeric,
  disbursement_amount numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.loan_cases TO authenticated;
GRANT ALL ON public.loan_cases TO service_role;
ALTER TABLE public.loan_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage loan_cases" ON public.loan_cases FOR ALL
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Insurance Cases
CREATE TABLE public.insurance_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES public.customers(id) ON DELETE CASCADE,
  policy_type text NOT NULL,
  insurer text,
  premium numeric,
  policy_status text NOT NULL DEFAULT 'Lead',
  renewal_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.insurance_cases TO authenticated;
GRANT ALL ON public.insurance_cases TO service_role;
ALTER TABLE public.insurance_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage insurance_cases" ON public.insurance_cases FOR ALL
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Mutual Funds
CREATE TABLE public.mutual_funds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES public.customers(id) ON DELETE CASCADE,
  fund_name text NOT NULL,
  sip_amount numeric,
  investment_type text,
  status text NOT NULL DEFAULT 'Lead',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mutual_funds TO authenticated;
GRANT ALL ON public.mutual_funds TO service_role;
ALTER TABLE public.mutual_funds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage mutual_funds" ON public.mutual_funds FOR ALL
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Activities
CREATE TABLE public.activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid,
  lead_id uuid,
  activity_type text NOT NULL,
  notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.activities TO authenticated;
GRANT ALL ON public.activities TO service_role;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage activities" ON public.activities FOR ALL
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Tasks
CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  assigned_to uuid,
  related_customer_id uuid,
  related_lead_id uuid,
  due_date timestamptz,
  status text NOT NULL DEFAULT 'open',
  priority text NOT NULL DEFAULT 'medium',
  task_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO authenticated;
GRANT ALL ON public.tasks TO service_role;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage tasks" ON public.tasks FOR ALL
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Documents
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid,
  document_type text NOT NULL,
  file_url text NOT NULL,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage documents" ON public.documents FOR ALL
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));