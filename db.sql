CREATE TABLE public."user" (
    id bigserial PRIMARY KEY,
    "name" varchar NOT NULL,
    cpf varchar NULL,
    cnpj varchar NULL,
    email varchar NOT NULL,
    "password" varchar NOT NULL,
    type_user varchar NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW(),
    CONSTRAINT user_pk PRIMARY KEY (id)

);

CREATE TABLE public.user_type (
	id bigserial PRIMARY KEY,
	"type" varchar NOT NULL,
	make_payment boolean NOT NULL,
	created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT user_type_pk PRIMARY KEY (id)
);

CREATE TABLE public.account (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	account_owner int NOT NULL,
	active boolean NOT NULL,
	balance decimal NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT account_pk PRIMARY KEY (id)
    CONSTRAINT account_fk FOREIGN KEY (account_owner)
        REFERENCES public."user" (id)
        ON DELETE CASCADE
);

CREATE TABLE public.transaction (
	id bigserial NOT NULL,
	amount_paid decimal NOT NULL,
	transfer_sent_to int NOT NULL,
    transfer_sent_from int NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
	updated_at timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT transactions_pk PRIMARY KEY (id),
    CONSTRAINT transaction_fk FOREIGN KEY (payee)
        REFERENCES public."account" (id)
        CONSTRAINT transaction_fk FOREIGN KEY (payer)
        REFERENCES public."account" (id)
);

INSERT INTO public."user" (
    "name", cpf, cnpj, email, "password", type_user
    ) 
    VALUES ('Usuario Teste', NULL, NULL, 'teste@example.com', '123456', 'client');
    INSERT INTO public."user" ("name", cpf, cnpj, email, "password", type_user) 
    VALUES ('Usuario Cliente Teste', '588.879.670-08', NULL, 'teste@example.com', '123456', 'client'),
    ('Usuario Lojista Teste', NULL, '12.345.678/0001-90', 'test1@exemple.com','pass1', 'account_manager'	);

INSERT INTO public.user_type (type, active, make_payment)
VALUES ('client', true, true), ('account_manager', true, false);