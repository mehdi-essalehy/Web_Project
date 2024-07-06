--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    "ID" bigint NOT NULL,
    "Nom" character varying NOT NULL,
    "Password" character varying NOT NULL
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- Name: Admin_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Admin_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Admin_ID_seq" OWNER TO postgres;

--
-- Name: Admin_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Admin_ID_seq" OWNED BY public."Admin"."ID";


--
-- Name: Classe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Classe" (
    "ID" bigint NOT NULL,
    "Prof_ID" bigint NOT NULL,
    "Matiere_ID" bigint NOT NULL,
    "Annee" integer NOT NULL
);


ALTER TABLE public."Classe" OWNER TO postgres;

--
-- Name: Classe_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Classe_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Classe_ID_seq" OWNER TO postgres;

--
-- Name: Classe_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Classe_ID_seq" OWNED BY public."Classe"."ID";


--
-- Name: Etudiant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Etudiant" (
    "ID" bigint NOT NULL,
    "Nom" character varying NOT NULL,
    "Prenom" character varying NOT NULL,
    "Date_de_naissance" date NOT NULL,
    "Niveau" integer NOT NULL,
    "Orientation_Tronc_Commun" bigint,
    "Orientation_Bac_1" bigint,
    "Orientation_Bac_2" bigint,
    "Date_enregistrement" date NOT NULL,
    "Password" character varying NOT NULL
);


ALTER TABLE public."Etudiant" OWNER TO postgres;

--
-- Name: Etudiant_Classe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Etudiant_Classe" (
    "Etudiant_ID" integer NOT NULL,
    "Classe_ID" integer NOT NULL,
    "Note" numeric,
    "Remarque_du_prof" character varying,
    "Commentaire" character varying
);


ALTER TABLE public."Etudiant_Classe" OWNER TO postgres;

--
-- Name: Etudiant_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Etudiant_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Etudiant_ID_seq" OWNER TO postgres;

--
-- Name: Etudiant_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Etudiant_ID_seq" OWNED BY public."Etudiant"."ID";


--
-- Name: Matiere; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Matiere" (
    "ID" bigint NOT NULL,
    "Nom" character varying NOT NULL,
    "Niveau" integer NOT NULL
);


ALTER TABLE public."Matiere" OWNER TO postgres;

--
-- Name: Matiere_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Matiere_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Matiere_ID_seq" OWNER TO postgres;

--
-- Name: Matiere_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Matiere_ID_seq" OWNED BY public."Matiere"."ID";


--
-- Name: Orientation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Orientation" (
    "ID" bigint NOT NULL,
    "Nom" character varying NOT NULL,
    "Niveau" integer NOT NULL,
    "Description" character varying
);


ALTER TABLE public."Orientation" OWNER TO postgres;

--
-- Name: Orientation_Dependance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Orientation_Dependance" (
    "Orientation" bigint NOT NULL,
    "Orientation_Suivante" bigint NOT NULL
);


ALTER TABLE public."Orientation_Dependance" OWNER TO postgres;

--
-- Name: Orientation_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Orientation_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Orientation_ID_seq" OWNER TO postgres;

--
-- Name: Orientation_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Orientation_ID_seq" OWNED BY public."Orientation"."ID";


--
-- Name: Orientation_Matiere; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Orientation_Matiere" (
    "Orientation_ID" bigint NOT NULL,
    "Matiere_ID" bigint NOT NULL,
    "Coefficient" integer NOT NULL
);


ALTER TABLE public."Orientation_Matiere" OWNER TO postgres;

--
-- Name: Professeur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Professeur" (
    "ID" bigint NOT NULL,
    "Nom" character varying NOT NULL,
    "Prenom" character varying NOT NULL,
    "Password" character varying NOT NULL
);


ALTER TABLE public."Professeur" OWNER TO postgres;

--
-- Name: Professeur_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Professeur_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Professeur_ID_seq" OWNER TO postgres;

--
-- Name: Professeur_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Professeur_ID_seq" OWNED BY public."Professeur"."ID";


--
-- Name: Admin ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN "ID" SET DEFAULT nextval('public."Admin_ID_seq"'::regclass);


--
-- Name: Classe ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Classe" ALTER COLUMN "ID" SET DEFAULT nextval('public."Classe_ID_seq"'::regclass);


--
-- Name: Etudiant ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Etudiant" ALTER COLUMN "ID" SET DEFAULT nextval('public."Etudiant_ID_seq"'::regclass);


--
-- Name: Matiere ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Matiere" ALTER COLUMN "ID" SET DEFAULT nextval('public."Matiere_ID_seq"'::regclass);


--
-- Name: Orientation ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orientation" ALTER COLUMN "ID" SET DEFAULT nextval('public."Orientation_ID_seq"'::regclass);


--
-- Name: Professeur ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Professeur" ALTER COLUMN "ID" SET DEFAULT nextval('public."Professeur_ID_seq"'::regclass);


--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Admin" ("ID", "Nom", "Password") FROM stdin;
1	Mehdi Essalehy	$2a$10$755JGYVb9sHI0KZLi4vbnOMC2OsuwHamWlzlXJZo1tPPVm1sC5m8q
\.


--
-- Data for Name: Classe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Classe" ("ID", "Prof_ID", "Matiere_ID", "Annee") FROM stdin;
16	4	1	2025
17	4	2	2025
18	4	3	2025
19	4	4	2025
20	4	5	2025
21	4	6	2025
22	4	7	2025
23	4	8	2025
24	4	9	2025
25	4	10	2025
26	4	11	2025
27	4	9	2025
\.


--
-- Data for Name: Etudiant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Etudiant" ("ID", "Nom", "Prenom", "Date_de_naissance", "Niveau", "Orientation_Tronc_Commun", "Orientation_Bac_1", "Orientation_Bac_2", "Date_enregistrement", "Password") FROM stdin;
7	Ridaoui	Oualid	1999-06-16	1	4	\N	\N	2024-07-05	$2a$10$rHzNLLvyuzA37XI/zod3eeHHt.5nPO4rzkMGHmT6ZfmP5.27zJYrC
8	El Mohammadi	Ayoub	1998-05-12	1	3	\N	\N	2024-07-05	$2a$10$HYN4i0ZOjInrJfNd5e3W2uuhryAa3r1nXMUAgY4.wa5SH0utChTpC
6	Chehbaoui	Mohammed	2000-01-19	2	4	11	\N	2024-07-04	$2a$10$k8wxb9H5neMFXLECN3kfaOjxtlWQBUjN2Ruq1eve8iplZSXuLaQT2
9	Abdou	Mohammed	1997-07-10	1	4	\N	\N	2024-07-06	$2a$10$LlmOoK/Y4n/gaDrV5i7RI.wGkm.PBubFBZ8R74ygle9kzR/9hW0My
\.


--
-- Data for Name: Etudiant_Classe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Etudiant_Classe" ("Etudiant_ID", "Classe_ID", "Note", "Remarque_du_prof", "Commentaire") FROM stdin;
6	17	16		\N
6	18	13		\N
6	19	19		\N
6	20	18		\N
6	21	16		\N
6	22	15.5		\N
6	23	17.25		\N
6	25	15		\N
6	24	19	TEST	\N
6	16	12	Excellent Travail!	TEST
8	16	\N	\N	\N
\.


--
-- Data for Name: Matiere; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Matiere" ("ID", "Nom", "Niveau") FROM stdin;
1	Mathématiques	1
2	Physique Chimie	1
3	Sciences de la Vie et de la Terre	1
4	Arabe	1
5	Français	1
6	Anglais	1
7	Histoire Géographie	1
8	Education Islamique	1
9	Philosophie	1
10	Informatique	1
11	Sciences de l'Ingenieur	1
12	Mathématiques	2
13	Physique et Chimie	2
14	Sciences de la Vie et de la Terre	2
15	Arabe	2
16	Français	2
17	Anglais	2
18	Histoire Géographie	2
19	Education Islamique	2
20	Philosophie	2
21	Science de l'Ingenieur	2
22	Economie et Organisation Administrative des Entreprises	2
23	Comptabilité et Mathématiques Financières	2
24	Economie Générale et Statistiques	2
25	Droit	2
26	Informatique de Gestion	2
27	Mathématiques	3
28	Physique et Chimie	3
29	Sciences de la Vie et de la Terre	3
30	Arabe	3
31	Français	3
32	Anglais	3
33	Education Islamique	3
34	Philosophie	3
35	Sciences de l'ingénieur	3
36	Sciences Végétales et Animales	3
37	Histoire Géographie	3
38	Économie et Organisation Administrative des Entreprises	3
39	Comptabilité et Mathématiques Financières	3
40	Économie générale et Statistiques	3
41	Droit	3
42	Informatique de Gestion	3
\.


--
-- Data for Name: Orientation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Orientation" ("ID", "Nom", "Niveau", "Description") FROM stdin;
2	Tronc Commun Originel	1	Cette orientation est axée sur les sciences islamiques et les études religieuses. Elle est destinée aux élèves intéressés par la culture islamique et les études religieuses, préparant à des filières en sciences humaines et religieuses.
3	Tronc Commun Lettres et Sciences Humaines	1	Cette orientation est destinée aux élèves ayant un intérêt marqué pour les langues, la littérature et les sciences humaines. Elle prépare les étudiants à des filières littéraires et sociales en première année du baccalauréat (1ère Bac).
4	Tronc Commun Scientifique	1	Cette orientation est conçue pour les élèves intéressés par les sciences exactes et naturelles. Elle prépare les étudiants à des filières scientifiques et techniques en première année du baccalauréat (1ère Bac).
5	Tronc Commun Technologique	1	Cette orientation est conçue pour les élèves intéressés par les technologies et les applications pratiques des sciences. Elle prépare les étudiants à des filières techniques et professionnelles en première année du baccalauréat (1ère Bac).
6	Sciences Chariaa	2	Cette orientation est destinée aux élèves intéressés par les études religieuses islamiques et la jurisprudence islamique. Elle prépare les étudiants à des études en sciences islamiques et en droit islamique.
7	Langue Arabe	2	Cette orientation est destinée aux élèves passionnés par la langue arabe, sa littérature, et sa linguistique. Elle prépare les étudiants à des études littéraires, linguistiques, et culturelles.
8	Lettres et Sciences Humaines	2	Cette orientation est destinée aux élèves intéressés par les sciences sociales et humaines, la littérature et la philosophie. Elle prépare aux études en sciences humaines, en droit et en littérature.
9	Sciences Economiques et Gestion	2	Cette orientation prépare les élèves aux études en économie, gestion et commerce. Elle combine des matières économiques avec des bases mathématiques solides.
10	Arts Appliques	2	Cette orientation est destinée aux élèves créatifs et artistiques, intéressés par les arts visuels et les métiers du design. Elle prépare aux études en beaux-arts, en design graphique, et en architecture.
12	Sciences Mathematiques	2	Cette orientation est destinée aux élèves ayant un fort intérêt pour les mathématiques et les sciences exactes. Elle prépare aux études en mathématiques, en physique, en ingénierie et en informatique.
13	Sciences et Technologies Electriques	2	Cette orientation est axée sur l'étude des systèmes électriques et électroniques, préparant les élèves aux études en ingénierie électrique, en électronique et en technologies de l'information.
14	Sciences et Technologies Mecaniques	2	Cette orientation est destinée aux élèves intéressés par les systèmes mécaniques et les technologies de l'ingénierie. Elle prépare aux études en ingénierie mécanique, en robotique, et en conception industrielle.
15	Sciences Chariaa	3	Cette orientation est axée sur les études islamiques et la jurisprudence islamique. Elle prépare les étudiants à des études supérieures en sciences islamiques, en théologie et en droit islamique.
16	Langue Arabe	3	Cette orientation est destinée aux élèves passionnés par la langue arabe, sa littérature et sa linguistique. Elle prépare les étudiants à des études littéraires, linguistiques et culturelles.
17	Lettres	3	Cette orientation est destinée aux élèves intéressés par les sciences sociales et humaines, la littérature et la philosophie. Elle prépare aux études en sciences humaines, en droit et en littérature.
18	Sciences Humaines	3	Cette orientation est destinée aux élèves intéressés par les études sociales, la psychologie, la sociologie et les sciences humaines.
19	Sciences Economiques	3	Cette orientation prépare les élèves aux études en économie et en gestion. Elle combine des matières économiques avec des bases mathématiques solides.
20	Sciences de Gestion et Compatibilite	3	Cette orientation est destinée aux élèves intéressés par la gestion financière et la comptabilité, les préparant à des carrières en gestion d'entreprise et en finance.
21	Arts Appliques	3	Cette orientation est destinée aux élèves créatifs et artistiques, intéressés par les arts visuels et les métiers du design. Elle prépare aux études en beaux-arts, en design graphique, et en architecture.
22	Sciences de la Vie et de la Terre	3	Cette orientation est axée sur la biologie et la géologie, idéale pour les élèves intéressés par les sciences naturelles et les études environnementales.
23	Sciences Physique et Chimie	3	Cette orientation se concentre sur les sciences physiques et chimiques, préparant les élèves à des études en sciences naturelles et en ingénierie.
11	Sciences Experimentales	2	Cette orientation est axée sur les sciences naturelles, idéale pour les élèves intéressés par la biologie, la chimie, et la physique. Elle prépare aux études en sciences de la santé, en biologie, et en chimie.
24	Sciences Agronomiques	3	Cette orientation est axée sur l'agriculture, l'agronomie et les sciences de l'environnement. Elle prépare les élèves à des études en agriculture, en gestion des ressources naturelles et en sciences de l'environnement.
25	Sciences Mathematiques A	3	Cette orientation est destinée aux élèves ayant un fort intérêt pour les mathématiques pures et appliquées. Elle prépare aux études en mathématiques, en physique, en ingénierie et en informatique.
26	Sciences Mathematiques B	3	Cette orientation est similaire à Sciences Mathématiques A, mais souvent avec une plus grande concentration sur les applications pratiques des mathématiques dans les domaines de l'ingénierie et de la technologie.
27	Sciences et Technologies Electriques	3	Cette orientation est axée sur l'étude des systèmes électriques et électroniques, préparant les élèves aux études en ingénierie électrique, en électronique et en technologies de l'information.
28	Sciences et Technologies Mecaniques	3	Cette orientation est destinée aux élèves intéressés par les systèmes mécaniques et les technologies de l'ingénierie. Elle prépare aux études en ingénierie mécanique, en robotique et en conception industrielle.
\.


--
-- Data for Name: Orientation_Dependance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Orientation_Dependance" ("Orientation", "Orientation_Suivante") FROM stdin;
2	6
2	7
2	8
2	9
2	10
3	7
3	8
3	9
3	10
4	9
4	10
4	11
4	12
4	13
4	14
5	9
5	10
5	11
5	12
5	13
5	14
6	15
7	16
8	17
8	18
9	19
9	20
10	21
11	22
11	23
11	24
12	26
12	25
13	27
14	28
\.


--
-- Data for Name: Orientation_Matiere; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Orientation_Matiere" ("Orientation_ID", "Matiere_ID", "Coefficient") FROM stdin;
4	1	1
4	2	1
4	3	1
4	4	1
4	5	1
4	6	1
4	7	1
4	8	1
4	9	1
4	10	1
5	1	1
5	2	1
5	4	1
5	5	1
5	6	1
5	7	1
5	8	1
5	9	1
5	10	1
5	11	1
3	1	1
3	3	1
3	4	1
3	5	1
3	6	1
3	7	1
3	8	1
3	9	1
12	12	1
12	13	1
12	14	1
12	15	1
12	16	1
12	17	1
12	18	1
12	19	1
12	20	1
11	12	1
11	13	1
11	14	1
11	15	1
11	16	1
11	17	1
11	18	1
11	19	1
11	20	1
13	12	1
13	13	1
13	15	1
13	16	1
13	17	1
13	19	1
13	20	1
13	21	1
14	12	1
14	13	1
14	15	1
14	16	1
14	17	1
14	19	1
14	20	1
14	21	1
9	12	1
9	15	1
9	16	1
9	17	1
9	18	1
9	19	1
9	20	1
9	22	1
9	23	1
9	24	1
9	25	1
9	26	1
8	12	1
8	14	1
8	15	1
8	16	1
8	17	1
8	18	1
8	19	1
8	20	1
25	27	1
25	28	1
25	29	1
25	30	1
25	31	1
25	32	1
25	33	1
25	34	1
26	27	1
26	28	1
26	30	1
26	31	1
26	32	1
26	33	1
26	34	1
26	35	1
23	27	1
23	28	1
23	29	1
23	30	1
23	31	1
23	32	1
23	33	1
23	34	1
22	27	1
22	28	1
22	29	1
22	30	1
22	31	1
22	32	1
22	33	1
22	34	1
24	27	1
24	28	1
24	29	1
24	30	1
24	31	1
24	32	1
24	33	1
24	34	1
24	36	1
24	37	1
27	27	1
27	28	1
27	30	1
27	31	1
27	32	1
27	33	1
27	34	1
27	35	1
28	27	1
28	28	1
28	30	1
28	31	1
28	32	1
28	33	1
28	34	1
28	35	1
19	27	1
19	30	1
19	31	1
19	32	1
19	33	1
19	34	1
19	37	1
19	38	1
19	39	1
19	40	1
19	41	1
19	42	1
20	27	1
20	30	1
20	31	1
20	32	1
20	33	1
20	34	1
20	37	1
20	38	1
20	39	1
20	40	1
20	41	1
20	42	1
17	27	1
17	30	1
17	31	1
17	32	1
17	33	1
17	34	1
17	37	1
18	27	1
18	30	1
18	31	1
18	32	1
18	33	1
18	34	1
18	37	1
\.


--
-- Data for Name: Professeur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Professeur" ("ID", "Nom", "Prenom", "Password") FROM stdin;
4	Essalehy	Mehdi	$2a$10$56TsdgsoCGWT4qs7V3dRyOM9WetmWykgJG0is/K6ycGWVB2rxTcI2
\.


--
-- Name: Admin_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Admin_ID_seq"', 3, true);


--
-- Name: Classe_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Classe_ID_seq"', 27, true);


--
-- Name: Etudiant_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Etudiant_ID_seq"', 9, true);


--
-- Name: Matiere_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Matiere_ID_seq"', 42, true);


--
-- Name: Orientation_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Orientation_ID_seq"', 28, true);


--
-- Name: Professeur_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Professeur_ID_seq"', 4, true);


--
-- Name: Admin Admin_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_PK" PRIMARY KEY ("ID") INCLUDE ("ID");


--
-- Name: Classe Classe_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Classe"
    ADD CONSTRAINT "Classe_PK" PRIMARY KEY ("ID") INCLUDE ("ID");


--
-- Name: Etudiant_Classe Etudiant_Classe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Etudiant_Classe"
    ADD CONSTRAINT "Etudiant_Classe_pkey" PRIMARY KEY ("Etudiant_ID", "Classe_ID");


--
-- Name: Etudiant Etudiant_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Etudiant"
    ADD CONSTRAINT "Etudiant_PK" PRIMARY KEY ("ID") INCLUDE ("ID");


--
-- Name: Matiere Matiere_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Matiere"
    ADD CONSTRAINT "Matiere_PK" PRIMARY KEY ("ID") INCLUDE ("ID");


--
-- Name: Orientation_Matiere Orientation_Matiere_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orientation_Matiere"
    ADD CONSTRAINT "Orientation_Matiere_pkey" PRIMARY KEY ("Orientation_ID", "Matiere_ID");


--
-- Name: Orientation Orientation_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orientation"
    ADD CONSTRAINT "Orientation_PK" PRIMARY KEY ("ID") INCLUDE ("ID");


--
-- Name: Orientation_Dependance PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orientation_Dependance"
    ADD CONSTRAINT "PK" PRIMARY KEY ("Orientation", "Orientation_Suivante");


--
-- Name: Professeur Professeur_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Professeur"
    ADD CONSTRAINT "Professeur_PK" PRIMARY KEY ("ID") INCLUDE ("ID");


--
-- Name: Etudiant_Classe Classe_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Etudiant_Classe"
    ADD CONSTRAINT "Classe_FK" FOREIGN KEY ("Classe_ID") REFERENCES public."Classe"("ID") NOT VALID;


--
-- Name: Etudiant_Classe Etudiant_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Etudiant_Classe"
    ADD CONSTRAINT "Etudiant_FK" FOREIGN KEY ("Etudiant_ID") REFERENCES public."Etudiant"("ID") NOT VALID;


--
-- Name: Orientation_Matiere Matiere_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orientation_Matiere"
    ADD CONSTRAINT "Matiere_FK" FOREIGN KEY ("Matiere_ID") REFERENCES public."Matiere"("ID") NOT VALID;


--
-- Name: Classe Matiere_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Classe"
    ADD CONSTRAINT "Matiere_FK" FOREIGN KEY ("Matiere_ID") REFERENCES public."Matiere"("ID") NOT VALID;


--
-- Name: Orientation_Dependance Orientation; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orientation_Dependance"
    ADD CONSTRAINT "Orientation" FOREIGN KEY ("Orientation") REFERENCES public."Orientation"("ID") NOT VALID;


--
-- Name: Etudiant Orientation_B1_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Etudiant"
    ADD CONSTRAINT "Orientation_B1_FK" FOREIGN KEY ("Orientation_Bac_1") REFERENCES public."Orientation"("ID") NOT VALID;


--
-- Name: Etudiant Orientation_B2_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Etudiant"
    ADD CONSTRAINT "Orientation_B2_FK" FOREIGN KEY ("Orientation_Bac_2") REFERENCES public."Orientation"("ID") NOT VALID;


--
-- Name: Orientation_Matiere Orientation_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orientation_Matiere"
    ADD CONSTRAINT "Orientation_FK" FOREIGN KEY ("Orientation_ID") REFERENCES public."Orientation"("ID") NOT VALID;


--
-- Name: Orientation_Dependance Orientation_Suivante; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orientation_Dependance"
    ADD CONSTRAINT "Orientation_Suivante" FOREIGN KEY ("Orientation_Suivante") REFERENCES public."Orientation"("ID") NOT VALID;


--
-- Name: Etudiant Orientation_TC_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Etudiant"
    ADD CONSTRAINT "Orientation_TC_FK" FOREIGN KEY ("Orientation_Tronc_Commun") REFERENCES public."Orientation"("ID") NOT VALID;


--
-- Name: Classe Prof_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Classe"
    ADD CONSTRAINT "Prof_FK" FOREIGN KEY ("Prof_ID") REFERENCES public."Professeur"("ID") NOT VALID;


--
-- PostgreSQL database dump complete
--

