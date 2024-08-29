CREATE TABLE public.user_type (
	id bigserial NOT NULL,
	"type" varchar NOT NULL,
	make_payment bool NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	active bool NOT NULL,
	CONSTRAINT user_type_pkey PRIMARY KEY (id)
);

CREATE TABLE public."user" (
	id bigserial NOT NULL,
	"name" varchar NOT NULL,
	"document_number" varchar NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	type_user int4 NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT user_pkey PRIMARY KEY (id),
	CONSTRAINT user_type_fk FOREIGN KEY (type_user) REFERENCES public.user_type(id)
);
CREATE UNIQUE INDEX user_document_number_idx ON public."user" USING btree ("document_number");


CREATE TABLE public.account (
	id bigserial NOT NULL,
	account_owner int4 NOT NULL,
	active bool NOT NULL,
	balance decimal NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT account_pk PRIMARY KEY (id),
	CONSTRAINT account_fk FOREIGN KEY (account_owner) REFERENCES public."user"(id) ON DELETE CASCADE
);


CREATE TABLE public."transaction" (
	id bigserial NOT NULL,
	amount_paid numeric NOT NULL,
	payee int4 NOT NULL,
	payer int4 NOT NULL,
	created_at timestamptz DEFAULT now() NOT NULL,
	updated_at timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT transaction_pk PRIMARY KEY (id),
	CONSTRAINT payee_fk FOREIGN KEY (payee) REFERENCES public.account(id),
	CONSTRAINT payer_fk FOREIGN KEY (payer) REFERENCES public.account(id)
);

INSERT INTO public.user_type (type, active, make_payment)
VALUES ('customer', true, true), 
        ('account_manager', true, false);

INSERT INTO public."user" ("name", "document_number", email, "password", type_user) 
VALUES ('Usuario Cliente Teste', '588.879.670-08', 'teste@example.com', '64ad3fb166ddb41a2ca24f1803b8b722', 1),
		('Usuario Lojista Teste', '12.345.678/0001-90', 'test1@exemple.com','d6b0ab7f1c8ab8f514db9a6d85de160a', 2);

INSERT INTO public.account ("account_owner", "active", balance) 
VALUES (1, true, 500.00),
		(2, true, 100.00);