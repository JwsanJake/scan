USE [master]
GO
/****** Object:  Database [NEW_DVK]    Script Date: 18.10.2024 15:20:32 ******/
CREATE DATABASE [NEW_DVK]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'NEW_DVK', FILENAME = N'D:\Data\NEW_DVK.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'NEW_DVK_log', FILENAME = N'D:\Log\NEW_DVK_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [NEW_DVK] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [NEW_DVK].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [NEW_DVK] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [NEW_DVK] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [NEW_DVK] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [NEW_DVK] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [NEW_DVK] SET ARITHABORT OFF 
GO
ALTER DATABASE [NEW_DVK] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [NEW_DVK] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [NEW_DVK] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [NEW_DVK] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [NEW_DVK] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [NEW_DVK] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [NEW_DVK] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [NEW_DVK] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [NEW_DVK] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [NEW_DVK] SET  DISABLE_BROKER 
GO
ALTER DATABASE [NEW_DVK] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [NEW_DVK] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [NEW_DVK] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [NEW_DVK] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [NEW_DVK] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [NEW_DVK] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [NEW_DVK] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [NEW_DVK] SET RECOVERY FULL 
GO
ALTER DATABASE [NEW_DVK] SET  MULTI_USER 
GO
ALTER DATABASE [NEW_DVK] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [NEW_DVK] SET DB_CHAINING OFF 
GO
ALTER DATABASE [NEW_DVK] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [NEW_DVK] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [NEW_DVK] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [NEW_DVK] SET QUERY_STORE = OFF
GO
USE [NEW_DVK]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [NEW_DVK]
GO
/****** Object:  Table [dbo].[ADMIN_accesses]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADMIN_accesses](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[access_description] [nvarchar](120) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ADMIN_directions]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADMIN_directions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[factory_id] [int] NULL,
	[direction_name] [nvarchar](400) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ADMIN_factory]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADMIN_factory](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[factory_name] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ADMIN_position_accesses]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADMIN_position_accesses](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[position_id] [int] NULL,
	[access_id] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ADMIN_positions]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADMIN_positions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[subdivision_id] [int] NULL,
	[role_id] [int] NULL,
	[position_name] [nvarchar](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ADMIN_roles]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADMIN_roles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[role_name] [nvarchar](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ADMIN_subdivisions]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADMIN_subdivisions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[parent_id] [int] NULL,
	[factory_id] [int] NULL,
	[subdivision_name] [nvarchar](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ADMIN_users]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADMIN_users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[login] [nvarchar](40) NULL,
	[last_name] [nvarchar](20) NULL,
	[first_name] [nvarchar](20) NULL,
	[middle_name] [nvarchar](20) NULL,
	[email] [nvarchar](40) NULL,
	[position_id] [int] NULL,
	[factory_id] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[APPROVE_status]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[APPROVE_status](
	[step_id] [int] NULL,
	[event_identifier] [nvarchar](30) NULL,
	[executor_id] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AUTH_users]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AUTH_users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[login] [nvarchar](40) NULL,
	[password_hash] [nvarchar](250) NULL,
	[email] [nvarchar](40) NULL,
	[need_password_change] [int] NULL,
	[need_account_confirm] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_affiliation_types]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_affiliation_types](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[affilation_name] [nvarchar](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_affiliations]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_affiliations](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[affiliated_from] [nvarchar](20) NULL,
	[affiliated_to] [nvarchar](20) NULL,
	[affiliation_type_id] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_affiliations_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_affiliations_info](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[affiliation_identifier] [nvarchar](20) NULL,
	[affiliation_detect_date] [datetime] NULL,
	[affiliation_status] [nvarchar](20) NULL,
	[affiliation_termination_date] [datetime] NULL,
	[affiliation_type_id] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_financial_documents]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_financial_documents](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[input_type] [nvarchar](40) NULL,
	[filepath] [nvarchar](60) NULL,
	[event_identifier] [nvarchar](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_financial_solvency]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_financial_solvency](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[tax_payment_last_year] [nvarchar](800) NULL,
	[tax_debt_info] [nvarchar](800) NULL,
	[enforcement_proceedings_info] [nvarchar](800) NULL,
	[court_cases_info] [nvarchar](800) NULL,
	[criminal_administrative_cases_info] [nvarchar](800) NULL,
	[unscrupulous_participant_of_state_procurements] [nvarchar](800) NULL,
	[arrest_of_bank_balance] [nvarchar](800) NULL,
	[negative_info] [nvarchar](800) NULL,
	[event_identifier] [nvarchar](30) NULL,
	[create_date] [datetime] NULL,
	[update_date] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_info](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[company_title] [nvarchar](200) NULL,
	[bin] [nvarchar](20) NULL,
	[legal_address] [nvarchar](600) NULL,
	[actual_address] [nvarchar](600) NULL,
	[first_registration_date] [datetime] NULL,
	[last_registration_date] [datetime] NULL,
	[identifier] [nvarchar](30) NULL,
	[doc_number] [nvarchar](60) NULL,
	[is_manufacture] [bit] NULL,
	[manufacture_doc_path] [nvarchar](60) NULL,
	[is_dealer] [bit] NULL,
	[dealer_doc_path] [nvarchar](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_kind_of_activities]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_kind_of_activities](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[activity_name] [nvarchar](800) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_licenses]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_licenses](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[license_name] [nvarchar](800) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_negative]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_negative](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[event_identifier] [nvarchar](30) NULL,
	[management_negative_info] [nvarchar](800) NULL,
	[harm_to_companies_interests] [nvarchar](800) NULL,
	[international_sanctions] [nvarchar](800) NULL,
	[judicial_executive_authorities_sanctions] [nvarchar](800) NULL,
	[misrepresentations] [nvarchar](800) NULL,
	[anticorruption_reservation] [nvarchar](800) NULL,
	[inconsistency_of_contract_conditions] [nvarchar](800) NULL,
	[inconsistency_of_corporation_requirements] [nvarchar](800) NULL,
	[create_date] [datetime] NULL,
	[update_date] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_negative_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_negative_info](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[availability_of_reliable_info] [nvarchar](800) NULL,
	[unreimbursed_damage_info] [nvarchar](800) NULL,
	[availability_of_checks] [nvarchar](800) NULL,
	[presence_of_negative_info] [nvarchar](800) NULL,
	[identifier] [nvarchar](20) NULL,
	[event_identifier] [nvarchar](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[COMPANY_negative_info_files]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMPANY_negative_info_files](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[input_type] [nvarchar](40) NULL,
	[filepath] [nvarchar](60) NULL,
	[event_identifier] [nvarchar](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EVENT_additional_fields]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EVENT_additional_fields](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](30) NULL,
	[event_type] [nvarchar](20) NULL,
	[event_vacant_position] [nvarchar](100) NULL,
	[event_transfer_position] [nvarchar](100) NULL,
	[event_subject_of_contract] [nvarchar](60) NULL,
	[event_contract_amount] [nvarchar](60) NULL,
	[event_person_position] [nvarchar](80) NULL,
	[event_number_of_contract] [nvarchar](60) NULL,
	[event_contract_executor] [nvarchar](60) NULL,
	[event_ISA_type] [nvarchar](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EVENT_common]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EVENT_common](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](30) NULL,
	[event_create_executor] [nvarchar](30) NULL,
	[executor_subdivision] [nvarchar](200) NULL,
	[event_start_date] [datetime] NULL,
	[event_control_date] [datetime] NULL,
	[event_type] [nvarchar](20) NULL,
	[event_status] [nvarchar](20) NULL,
	[event_doc_ground] [nvarchar](40) NULL,
	[event_object] [nvarchar](800) NULL,
	[event_subject] [nvarchar](20) NULL,
	[event_content] [nvarchar](600) NULL,
	[event_result] [nvarchar](20) NULL,
	[event_executor_conclusion] [nvarchar](20) NULL,
	[event_curator_conclusion] [nvarchar](20) NULL,
	[event_conclusion_description] [nvarchar](600) NULL,
	[event_supervisor_1_conclusion] [nvarchar](20) NULL,
	[event_supervisor_2_conclusion] [nvarchar](20) NULL,
	[event_supervisor_description] [nvarchar](600) NULL,
	[event_end_date] [datetime] NULL,
	[event_step] [nvarchar](40) NULL,
	[create_date] [datetime] NULL,
	[update_date] [datetime] NULL,
	[event_outgoing_doc] [nvarchar](40) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EVENT_conclusions]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EVENT_conclusions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[event_identifier] [nvarchar](30) NULL,
	[conclusion_step] [int] NULL,
	[conclusion_status] [nvarchar](20) NULL,
	[conclusion_description] [nvarchar](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FILES_documents_path]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FILES_documents_path](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[input_type] [nvarchar](60) NULL,
	[filepath] [nvarchar](60) NULL,
	[event_identifier] [nvarchar](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NOTIFICATION_registry]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NOTIFICATION_registry](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[event_identifier] [nvarchar](30) NULL,
	[role_id] [int] NULL,
	[current_user_login] [nvarchar](40) NULL,
	[notification_status] [nvarchar](40) NULL,
	[create_date] [datetime] NULL,
	[update_date] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERSON_career]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSON_career](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[company_name] [nvarchar](400) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[job_position] [nvarchar](400) NULL,
	[create_date] [datetime] NULL,
	[update_date] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERSON_citizenship]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSON_citizenship](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[country] [nvarchar](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERSON_education]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSON_education](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[edu_institution_name] [nvarchar](600) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[specialization] [nvarchar](600) NULL,
	[qualification] [nvarchar](600) NULL,
	[create_date] [datetime] NULL,
	[education_type] [nvarchar](40) NULL,
	[update_date] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERSON_family_member]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSON_family_member](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[last_name] [nvarchar](30) NULL,
	[first_name] [nvarchar](30) NULL,
	[middle_name] [nvarchar](30) NULL,
	[iin] [nvarchar](16) NULL,
	[work_place] [nvarchar](400) NULL,
	[family_status] [nvarchar](60) NULL,
	[create_date] [datetime] NULL,
	[update_date] [datetime] NULL,
	[birthdate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERSON_financial_documents]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSON_financial_documents](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[input_type] [nvarchar](40) NULL,
	[filepath] [nvarchar](60) NULL,
	[event_identifier] [nvarchar](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERSON_financial_solvency]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSON_financial_solvency](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[event_identifier] [nvarchar](30) NULL,
	[tax_debt] [nvarchar](800) NULL,
	[legal_entity] [nvarchar](800) NULL,
	[enforcement_proceedings] [nvarchar](800) NULL,
	[KZ_departure_ban] [nvarchar](800) NULL,
	[court_cases] [nvarchar](800) NULL,
	[negative_info] [nvarchar](800) NULL,
	[create_date] [datetime] NULL,
	[update_date] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERSON_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSON_info](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[last_name] [nvarchar](30) NULL,
	[first_name] [nvarchar](30) NULL,
	[middle_name] [nvarchar](30) NULL,
	[birthdate] [datetime] NULL,
	[birthplace] [nvarchar](60) NULL,
	[identification] [nvarchar](20) NULL,
	[iin] [nvarchar](16) NULL,
	[citizenship] [nvarchar](20) NULL,
	[family_status] [nvarchar](20) NULL,
	[phone_number] [nvarchar](20) NULL,
	[legal_address] [nvarchar](300) NULL,
	[actual_address] [nvarchar](300) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERSON_negative]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSON_negative](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[event_identifier] [nvarchar](30) NULL,
	[erdr_info] [nvarchar](800) NULL,
	[criminal_offense] [nvarchar](800) NULL,
	[disengagement] [nvarchar](800) NULL,
	[administrative_responsibility] [nvarchar](800) NULL,
	[unreimbursed_damage] [nvarchar](800) NULL,
	[presense_of_family_ties] [nvarchar](800) NULL,
	[presence_of_disciplinary_action] [nvarchar](800) NULL,
	[suspension_from_work] [nvarchar](800) NULL,
	[termination_of_contract] [nvarchar](800) NULL,
	[criminal_record] [nvarchar](800) NULL,
	[criminal_remission] [nvarchar](800) NULL,
	[personal_sanctions] [nvarchar](800) NULL,
	[create_date] [datetime] NULL,
	[update_date] [datetime] NULL,
	[db_data_check] [nvarchar](800) NULL,
	[police_data_check] [nvarchar](800) NULL,
	[family_negative_info] [nvarchar](800) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PERSON_negative_info_files]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PERSON_negative_info_files](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](20) NULL,
	[input_type] [nvarchar](40) NULL,
	[filepath] [nvarchar](60) NULL,
	[event_identifier] [nvarchar](30) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VIOLATION_additional_fields]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VIOLATION_additional_fields](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](30) NULL,
	[violation_type] [nvarchar](40) NULL,
	[violation_sum] [nvarchar](60) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VIOLATION_categories]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VIOLATION_categories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[violation_category] [nvarchar](80) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VIOLATION_common]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VIOLATION_common](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[identifier] [nvarchar](30) NULL,
	[violation_create_executor] [nvarchar](30) NULL,
	[executor_subdivision] [nvarchar](30) NULL,
	[event_identifier] [nvarchar](30) NULL,
	[violation_register_date] [datetime] NULL,
	[violation_description] [nvarchar](max) NULL,
	[violation_marker] [nvarchar](30) NULL,
	[violation_category] [nvarchar](40) NULL,
	[kind_of_violation] [nvarchar](60) NULL,
	[violation_object] [nvarchar](20) NULL,
	[violation_subject] [nvarchar](20) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VIOLATION_kinds]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VIOLATION_kinds](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[category_id] [int] NULL,
	[violation_kind] [nvarchar](80) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VIOLATION_response_measures]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VIOLATION_response_measures](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[violation_response_measure_name] [nvarchar](40) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VIOLATION_response_measures_types]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VIOLATION_response_measures_types](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[violation_response_measure_id] [int] NULL,
	[violation_response_measure_type_name] [nvarchar](40) NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_add_accesses]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_add_accesses]
	@id int,
	@access int
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.ADMIN_position_accesses (position_id, access_id) 
	VALUES (@id, @access)
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_add_direction]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_add_direction]
	@factoryId int,
	@directionName nvarchar(400)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.ADMIN_directions (factory_id, direction_name) VALUES (@factoryId, @directionName);
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_add_factory]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_add_factory]
	@factoryName nvarchar(200)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.ADMIN_factory (factory_name) VALUES (@factoryName);
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_add_position]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_add_position]
	@subdivisionId int,
	@positionName nvarchar(400)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.ADMIN_positions (subdivision_id, position_name) 
	VALUES (@subdivisionId, @positionName)

	DECLARE @id int =SCOPE_IDENTITY()

	SELECT @id as id
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_add_subdivision]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_add_subdivision]
	@factoryId int,
	@parentId int,
	@subdivisionName nvarchar(400)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.ADMIN_subdivisions (factory_id, parent_id, subdivision_name) 
	VALUES (@factoryId, @parentId, @subdivisionName);
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_add_user]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_add_user]
	@lastName nvarchar(60),
	@firstName nvarchar(60),
	@middleName nvarchar(60),
	@email nvarchar(60),
	@passwordHash nvarchar(250)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.ADMIN_users (last_name, first_name, middle_name, email) VALUES (@lastName, @firstName, @middleName, @email)



	DECLARE @isExist nvarchar(25) = (SELECT COUNT(*) FROM [dbo].[AUTH_users] WHERE email = @email)

	DECLARE @need_password_change INT = 1;
	DECLARE @need_confirm_account INT = 1;

	IF @isExist = 0
	BEGIN 
		INSERT INTO [dbo].[AUTH_users]
		VALUES (@email, @passwordHash, @email, @need_password_change, @need_confirm_account)
	END


	SELECT email
	FROM [dbo].[AUTH_users]
	WHERE email = @email
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_get_all_accesses]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_get_all_accesses]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT id as value, access_description as label FROM dbo.ADMIN_accesses
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_get_all_directions]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_get_all_directions]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.ADMIN_directions
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_get_all_employees]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_get_all_employees]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT au.last_name, au.first_name, au.middle_name, au.email, ap.position_name
	FROM dbo.ADMIN_users au
	LEFT JOIN dbo.ADMIN_positions ap
	ON au.position_id = ap.id
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_get_all_factories]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_get_all_factories]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.ADMIN_factory
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_get_all_positions]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_get_all_positions]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.ADMIN_positions
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_get_all_subdivisions]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_get_all_subdivisions]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.ADMIN_subdivisions
END
GO
/****** Object:  StoredProcedure [dbo].[ADMIN_register_new_user]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ADMIN_register_new_user]
	@login nvarchar(30),
	@password_hash nvarchar(250),
	@email nvarchar(100)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @isExist nvarchar(25) = (SELECT COUNT(*) FROM [dbo].[AUTH_users] WHERE email = @email)

	DECLARE @need_password_change INT = 1;
	DECLARE @need_confirm_account INT = 1;

	IF @isExist = 0
	BEGIN 
		INSERT INTO [dbo].[AUTH_users]
		VALUES (@login, @password_hash, @email, @need_password_change, @need_confirm_account)
	END

	--SELECT card_no, employee_id, NEED_PASSWORD_CHANGE
	--FROM [dbo].[T_CARD_AUTH]
	--WHERE CARD_NO = @login OR EMPLOYEE_ID = @login;

	SELECT email
	FROM [dbo].[AUTH_users]
	WHERE email = @email
END
GO
/****** Object:  StoredProcedure [dbo].[AUTH_get_user_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AUTH_get_user_info]
	@login varchar(50)
AS
BEGIN
	SET NOCOUNT ON;


	DECLARE @positionId int = (SELECT position_id FROM dbo.ADMIN_users WHERE login = @login)

	SELECT au.last_name, au.first_name, au.middle_name, au.email, asub.subdivision_name, ap.role_id
	FROM dbo.ADMIN_users au
	
	LEFT JOIN ADMIN_positions ap
	ON au.position_id = ap.id
	LEFT JOIN ADMIN_subdivisions asub
	ON ap.subdivision_id = asub.id


	where login = @login

	select access_id
	from dbo.ADMIN_position_accesses apa
	LEFT JOIN ADMIN_accesses aa
	ON apa.access_id = aa.id
	WHERE apa.position_id = @positionId

END
GO
/****** Object:  StoredProcedure [dbo].[AUTH_get_user_roles]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AUTH_get_user_roles]
	@login varchar(50)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT factory_id FROM ADMIN_users where login = @login
	
END

--select * from AUTH_users
--select * from ADMIN_users
GO
/****** Object:  StoredProcedure [dbo].[AUTH_login]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AUTH_login]
	@login varchar(50)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @found_user NVARCHAR(250) = (SELECT TOP 1 login
											 FROM [dbo].[AUTH_users] 	
											 WHERE login = @login);

	SELECT login AS LOGIN, password_hash AS PASSWORD_HASH, need_account_confirm AS NEED_ACCOUNT_CONFIRM
	FROM [dbo].[AUTH_users] 	
	WHERE login = @login

END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_add_activity]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_add_activity]
	@identifier nvarchar(200),
	@activity_name nvarchar(800)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.COMPANY_kind_of_activities(identifier, activity_name)
	VALUES (@identifier, @activity_name)
	
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_add_affiliations]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_add_affiliations]
	@identifier nvarchar(20),
	@parentId nvarchar(20),
	@affType int
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.COMPANY_affiliations (affiliated_from, affiliated_to, affiliation_type_id)
	VALUES (@identifier, @parentId, @affType)

	INSERT INTO dbo.COMPANY_affiliations_info (identifier, affiliation_identifier, affiliation_detect_date, affiliation_status, affiliation_type_id)
	VALUES (@identifier, @parentId, GETDATE(), N'активный', @affType)

END
GO
/****** Object:  StoredProcedure [dbo].[COMPANY_add_conclusion]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_add_conclusion]
	@identifier nvarchar(20),
	@isRisky nvarchar(600),
	@subject_of_agreement nvarchar(80),
	@amount_of_agreement nvarchar(80),
	@agreement_executor nvarchar(80),
	@customer_service nvarchar(80),
	@company_selection_method nvarchar(80),
	@conclusion nvarchar(20),
	@conclusion_description nvarchar(200),
	@compliance_the_requirements_of_acts nvarchar(80) ,
	@compliance_the_contract_with_conclusion nvarchar(80)
AS
BEGIN
	SET NOCOUNT ON;

	IF NOT EXISTS( SELECT identifier FROM dbo.COMPANY_conclusion where identifier = @identifier)
	BEGIN
		INSERT INTO dbo.COMPANY_conclusion (identifier, isRisky,subject_of_agreement, amount_of_agreement, agreement_executor, customer_service, 
		company_selection_method, conclusion, conclusion_description, compliance_the_requirements_of_acts, compliance_the_contract_with_conclusion)
		VALUES (@identifier, @isRisky, @subject_of_agreement, @amount_of_agreement, @agreement_executor, @customer_service, 
		@company_selection_method, @conclusion, @conclusion_description, @compliance_the_requirements_of_acts, @compliance_the_contract_with_conclusion)
	END
	
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_add_director]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_add_director]
	@identifier nvarchar(20),
	@parentId nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.COMPANY_affiliations (affiliated_from, affiliated_to, affiliation_type_id)
	VALUES (@identifier, @parentId, 3)

	UPDATE dbo.COMPANY_info
	SET director_id = @parentId
	WHERE identifier = @identifier
	
END


GO
/****** Object:  StoredProcedure [dbo].[COMPANY_add_financial_solvency]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_add_financial_solvency]
	@identifier nvarchar(20),
	@event_identifier nvarchar(30),
    @tax_payment_last_year nvarchar(800),
	@tax_debt_info nvarchar(800),
	@enforcement_proceedings_info nvarchar(800),
	@court_cases_info nvarchar(800),
	@criminal_administrative_сases_info nvarchar(800),
	@unscrupulous_participant_of_state_procurements nvarchar(800),
	@arrest_of_bank_balance nvarchar(800),
	@negative_info nvarchar(800)
AS
BEGIN
	SET NOCOUNT ON;


	IF NOT EXISTS( SELECT identifier FROM dbo.COMPANY_financial_solvency where identifier = @identifier AND event_identifier = @event_identifier)
	BEGIN
		INSERT INTO COMPANY_financial_solvency (identifier, event_identifier, tax_payment_last_year,tax_debt_info, enforcement_proceedings_info, court_cases_info, 
		criminal_administrative_cases_info, unscrupulous_participant_of_state_procurements, arrest_of_bank_balance, negative_info, create_date)
		VALUES (@identifier, @event_identifier, @tax_payment_last_year, @tax_debt_info, @enforcement_proceedings_info, @court_cases_info, 
		@criminal_administrative_сases_info, @unscrupulous_participant_of_state_procurements, @arrest_of_bank_balance, @negative_info, GETDATE())
	END
	
END

select * from COMPANY_financial_solvency
GO
/****** Object:  StoredProcedure [dbo].[COMPANY_add_license]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_add_license]
	@identifier nvarchar(200),
	@license_name nvarchar(800)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.COMPANY_licenses(identifier, license_name)
	VALUES (@identifier, @license_name)
	
END
GO
/****** Object:  StoredProcedure [dbo].[COMPANY_add_negative_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_add_negative_info]
	@identifier nvarchar(20),
	@event_identifier nvarchar(30),
	@management_negative_info nvarchar(800),
    @harm_to_companies_interests nvarchar(800),
    @international_sanctions nvarchar(800),
    @judicial_executive_authorities_sanctions nvarchar(800),
    @misrepresentations nvarchar(800),
    @anticorruption_reservation nvarchar(800),
    @inconsistency_of_contract_conditions nvarchar(800),
    @inconsistency_of_corporation_requirements nvarchar(800)
AS
BEGIN
	SET NOCOUNT ON;

	IF NOT EXISTS( SELECT identifier FROM dbo.COMPANY_negative where identifier = @identifier AND event_identifier = @event_identifier)
	BEGIN
		INSERT INTO dbo.COMPANY_negative (identifier, event_identifier, management_negative_info, harm_to_companies_interests, international_sanctions, judicial_executive_authorities_sanctions, 
		misrepresentations, anticorruption_reservation, inconsistency_of_contract_conditions, inconsistency_of_corporation_requirements, create_date) 
		VALUES (@identifier, @event_identifier, @management_negative_info, @harm_to_companies_interests, @international_sanctions, @judicial_executive_authorities_sanctions, 
		@misrepresentations, @anticorruption_reservation, @inconsistency_of_contract_conditions, @inconsistency_of_corporation_requirements, GETDATE())
	END
END
GO
/****** Object:  StoredProcedure [dbo].[COMPANY_add_new]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_add_new]
	@company_title nvarchar(200),
	@doc_number nvarchar(60),
	@bin nvarchar(20),
	@legal_address nvarchar(600),
	@actual_address nvarchar(600),
	@first_registration_date nvarchar(20) = null,
	@last_registration_date nvarchar(20) = null

AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.COMPANY_info (company_title, doc_number, bin, legal_address, actual_address, first_registration_date, last_registration_date, is_manufacture, is_dealer)
	VALUES (@company_title, @doc_number, @bin, @legal_address, @actual_address,  @first_registration_date ,  @last_registration_date, 0,  0)

	DECLARE @id int =SCOPE_IDENTITY()
	DECLARE @identifier nvarchar(20) = (SELECT CONCAT(N'ДСОР',REPLICATE('0',6-LEN(RTRIM(@id))) + RTRIM(@id)))
    
	UPDATE dbo.COMPANY_info
	SET identifier = (SELECT CONCAT(N'ДСОР',REPLICATE('0',6-LEN(RTRIM(@id))) + RTRIM(@id)))
	where id = @id

	SELECT  @identifier as identifier
	
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_add_owner]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_add_owner]
	@identifier nvarchar(20),
	@parentId nvarchar(20),
	@affType int = 1
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.COMPANY_affiliations (affiliated_from, affiliated_to, affiliation_type_id)
	VALUES (@identifier, @parentId, @affType)
	
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_delete_activities]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_delete_activities]
	@identifier nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;


	DELETE FROM dbo.COMPANY_kind_of_activities WHERE identifier = @identifier
	
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_delete_licenses]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_delete_licenses]
	@identifier nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;


	DELETE FROM dbo.COMPANY_licenses WHERE identifier = @identifier
	
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_get_activities]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_get_activities]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT *
	FROM COMPANY_kind_of_activities

	WHERE identifier = @id;
	
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_get_affiliations]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_get_affiliations]
	@id nvarchar(20),
	@affType int = 0
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ca.affiliated_from as identifier, cat.affilation_name, cai.affiliation_status, cai.affiliation_detect_date, cai.affiliation_termination_date,

	CASE 
		WHEN ci.company_title IS NOT NULL 
		THEN ci.company_title 
		ELSE CONCAT(peri.last_name, ' ', peri.first_name, ' ', peri.middle_name)

	END as title
	FROM dbo.COMPANY_affiliations ca

	LEFT  JOIN dbo.COMPANY_affiliation_types cat
	ON ca.affiliation_type_id = cat.id

	LEFT JOIN dbo.COMPANY_info ci
	ON ci.identifier = ca.affiliated_from
	
	LEFT JOIN dbo.PERSON_info peri
	ON peri.identifier = ca.affiliated_from

	LEFT JOIN dbo.COMPANY_affiliations_info cai
	ON cai.identifier = ci.identifier OR cai.affiliation_identifier = ci.identifier AND cai.identifier = peri.identifier OR cai.affiliation_identifier = peri.identifier
	AND cai.affiliation_type_id = ca.affiliation_type_id 

	WHERE ca.affiliated_to = @id and  ca.affiliation_type_id =  @affType OR (@affType = 0 AND ca.affiliated_to = @id)
	

	UNION ALL
	SELECT ca.affiliated_to as identifier, cat.affilation_name, cai.affiliation_status, cai.affiliation_detect_date, cai.affiliation_termination_date,
	CASE 
		WHEN ci.company_title IS NOT NULL 
		THEN ci.company_title 
		ELSE CONCAT(peri.last_name, ' ', peri.first_name, ' ', peri.middle_name)
	END as title
	FROM dbo.COMPANY_affiliations ca

	LEFT JOIN dbo.COMPANY_affiliation_types cat
	ON ca.affiliation_type_id = cat.id
	LEFT JOIN dbo.COMPANY_info ci
	ON ci.identifier = ca.affiliated_to
	LEFT JOIN dbo.PERSON_info peri
	ON peri.identifier = ca.affiliated_to
	LEFT JOIN dbo.COMPANY_affiliations_info cai
	ON cai.identifier = ci.identifier OR cai.affiliation_identifier = ci.identifier AND cai.identifier = peri.identifier OR cai.affiliation_identifier = peri.identifier
	AND cai.affiliation_type_id = ca.affiliation_type_id
	WHERE ca.affiliated_from = @id and ca.affiliation_type_id =  @affType OR (@affType = 0 AND ca.affiliated_from = @id)

END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_get_all]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_get_all]
	
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		identifier,
		doc_number,
		company_title,
		bin,
		legal_address,
		actual_address,
		CAST(first_registration_date AS Date) AS first_registration_date,
		CAST(last_registration_date AS Date) AS last_registration_date,
		is_manufacture,
		is_dealer
	FROM COMPANY_info order by id desc
END


GO
/****** Object:  StoredProcedure [dbo].[COMPANY_get_all_data_by_id]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_get_all_data_by_id]
	@id nvarchar(20),
	@eventId nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.COMPANY_info where identifier = @id

	SELECT * FROM dbo.COMPANY_kind_of_activities where identifier = @id

	SELECT ca.affiliated_from as identifier, cat.affilation_name, peri.iin, peri.birthdate,
		peri.citizenship, peri.legal_address, peri.actual_address, peri.identification,

	CASE 
		WHEN ci.company_title IS NOT NULL 
		THEN ci.company_title 
		ELSE CONCAT(peri.last_name, ' ', peri.first_name, ' ', peri.middle_name)

	END as title
	FROM dbo.COMPANY_affiliations ca

	LEFT  JOIN dbo.COMPANY_affiliation_types cat
	ON ca.affiliation_type_id = cat.id

	LEFT JOIN dbo.COMPANY_info ci
	ON ci.identifier = ca.affiliated_from
	
	LEFT JOIN dbo.PERSON_info peri
	ON peri.identifier = ca.affiliated_from

	WHERE affiliated_to = @id and affiliation_type_id = 1


	-----------
	UNION ALL
	SELECT ca.affiliated_to as identifier, cat.affilation_name, peri.iin, peri.birthdate,
		peri.citizenship, peri.legal_address, peri.actual_address, peri.identification,
	CASE 
		WHEN ci.company_title IS NOT NULL 
		THEN ci.company_title 
		ELSE CONCAT(peri.last_name, ' ', peri.first_name, ' ', peri.middle_name)
	END as title
	FROM dbo.COMPANY_affiliations ca

	LEFT JOIN dbo.COMPANY_affiliation_types cat
	ON ca.affiliation_type_id = cat.id
	LEFT JOIN dbo.COMPANY_info ci
	ON ci.identifier = ca.affiliated_to
	LEFT JOIN dbo.PERSON_info peri
	ON peri.identifier = ca.affiliated_to
	WHERE affiliated_from = @id and affiliation_type_id = 1


	-------------------------------------------------
	-- Директор--
	SELECT ca.affiliated_from as identifier, cat.affilation_name, peri.iin, peri.birthdate,
		peri.citizenship, peri.legal_address, peri.actual_address, peri.identification,

	CASE 
		WHEN ci.company_title IS NOT NULL 
		THEN ci.company_title 
		ELSE CONCAT(peri.last_name, ' ', peri.first_name, ' ', peri.middle_name)

	END as title
	FROM dbo.COMPANY_affiliations ca

	LEFT  JOIN dbo.COMPANY_affiliation_types cat
	ON ca.affiliation_type_id = cat.id

	LEFT JOIN dbo.COMPANY_info ci
	ON ci.identifier = ca.affiliated_from
	
	LEFT JOIN dbo.PERSON_info peri
	ON peri.identifier = ca.affiliated_from

	WHERE affiliated_to = @id and affiliation_type_id = 3

	-----------
	UNION ALL
	SELECT ca.affiliated_to as identifier, cat.affilation_name, peri.iin, peri.birthdate,
		peri.citizenship, peri.legal_address, peri.actual_address, peri.identification,
	CASE 
		WHEN ci.company_title IS NOT NULL 
		THEN ci.company_title 
		ELSE CONCAT(peri.last_name, ' ', peri.first_name, ' ', peri.middle_name)
	END as title
	FROM dbo.COMPANY_affiliations ca

	LEFT JOIN dbo.COMPANY_affiliation_types cat
	ON ca.affiliation_type_id = cat.id
	LEFT JOIN dbo.COMPANY_info ci
	ON ci.identifier = ca.affiliated_to
	LEFT JOIN dbo.PERSON_info peri
	ON peri.identifier = ca.affiliated_to
	WHERE affiliated_from = @id and affiliation_type_id = 3
	------------------------------------------------------

	
	SELECT * FROM dbo.COMPANY_financial_solvency where identifier = @id AND event_identifier = @eventId
	SELECT * FROM dbo.COMPANY_licenses where identifier = @id
	SELECT * FROM dbo.COMPANY_negative where identifier = @id AND event_identifier = @eventId

	--SELECT * FROM dbo.EVENT_contractors_check where identifier = @eventId

	SELECT ec.event_create_executor,
		ec.executor_subdivision,
		ec.event_start_date,
		ec.event_control_date,
		ec.event_status,
		ec.event_doc_ground,
		ec.event_object,
		ec.event_subject,
		ec.event_content,
		ec.event_result,
		ec.event_executor_conclusion,
		ec.event_curator_conclusion,
		ec.event_supervisor_1_conclusion,
		ec.event_supervisor_2_conclusion,
		ec.event_conclusion_description,
		ec.event_supervisor_description,
		ec.event_end_date
	, eaf.*
	FROM  EVENT_common ec
	LEFT JOIN EVENT_additional_fields eaf
	ON ec.identifier = eaf.identifier
	WHERE ec.identifier = @eventId

END



GO
/****** Object:  StoredProcedure [dbo].[COMPANY_get_all_financial_solvency]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_get_all_financial_solvency]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM COMPANY_financial_solvency WHERE identifier = @id 

	SELECT input_type, filepath FROM dbo.FILES_documents_path
	WHERE identifier = @id

--	SELECT  cfs.*, fdp.input_type, fdp.filepath
--	FROM COMPANY_financial_solvency cfs
--JOIN FILES_documents_path fdp
--	ON cfs.event_identifier = fdp.event_identifier
--	WHERE cfs.identifier = @id 
	
END
GO
/****** Object:  StoredProcedure [dbo].[COMPANY_get_all_negative_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_get_all_negative_info]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.COMPANY_negative WHERE identifier = @id

	SELECT input_type, filepath FROM dbo.FILES_documents_path
	WHERE identifier = @id
END
GO
/****** Object:  StoredProcedure [dbo].[COMPANY_get_by_id]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_get_by_id]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ci.company_title, ci.doc_number, ci.bin, ci.legal_address, ci.actual_address, 
		ci.first_registration_date, ci.last_registration_date, ci.is_manufacture, ci.is_dealer
	FROM COMPANY_info ci WHERE identifier = @id

	SELECT * FROM dbo.COMPANY_kind_of_activities WHERE identifier = @id

	SELECT * FROM dbo.COMPANY_licenses WHERE identifier = @id

	SELECT input_type, filepath FROM dbo.FILES_documents_path
	WHERE identifier = @id
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_get_financial_solvency]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_get_financial_solvency]
	@id nvarchar(20),
	@eventIdentifier nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM COMPANY_financial_solvency 
	WHERE identifier = @id 
	AND event_identifier = @eventIdentifier

	SELECT input_type, filepath FROM dbo.FILES_documents_path
	WHERE identifier = @id
	AND event_identifier = @eventIdentifier
	
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_get_licenses]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_get_licenses]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT *
	FROM COMPANY_licenses

	WHERE identifier = @id;
	
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_get_negative_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_get_negative_info]
	@id nvarchar(20),
	@eventIdentifier nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.COMPANY_negative 
	WHERE identifier = @id 
	AND event_identifier = @eventIdentifier

	SELECT input_type, filepath FROM dbo.FILES_documents_path
	WHERE identifier = @id
	AND event_identifier = @eventIdentifier
END
GO
/****** Object:  StoredProcedure [dbo].[COMPANY_save_financial_documents_path]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_save_financial_documents_path]
	@identifier nvarchar(20),
	@eventIdentifier nvarchar(30),
	@inputType nvarchar(40),
	@filepath nvarchar(60)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.COMPANY_financial_documents(identifier, input_type, filepath, event_identifier)
	VALUES (@identifier, @inputType, @filepath, @eventIdentifier)
	
END
GO
/****** Object:  StoredProcedure [dbo].[COMPANY_save_negative_files_path]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_save_negative_files_path]
	@identifier nvarchar(20),
	@eventIdentifier nvarchar(30),
	@inputType nvarchar(40),
	@filepath nvarchar(60)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.COMPANY_negative_info_files(identifier, input_type, filepath, event_identifier)
	VALUES (@identifier, @inputType, @filepath, @eventIdentifier)
	
END
GO
/****** Object:  StoredProcedure [dbo].[COMPANY_update_affiliations]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_update_affiliations]
	@identifier nvarchar(20),
	@parentId nvarchar(20),
	@affType int,
	@affiliation_status nvarchar(20),
	@affiliation_termination_date datetime
AS
BEGIN
	SET NOCOUNT ON;

	--INSERT INTO dbo.COMPANY_affiliations (affiliated_from, affiliated_to, affiliation_type_id)
	--VALUES (@identifier, @parentId, 2)

	--INSERT INTO dbo.COMPANY_affiliations_info (identifier, affiliation_identifier, affiliation_detect_date, affiliation_status, affiliation_type_id, affiliation_termination_date)
	--VALUES (@identifier, @parentId, GETDATE(), N'активный', @affType)

	UPDATE dbo.COMPANY_affiliations_info
	SET affiliation_status = @affiliation_status
	WHERE identifier = @identifier and affiliation_identifier = @parentId
END

GO
/****** Object:  StoredProcedure [dbo].[COMPANY_update_financial_solvency]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_update_financial_solvency]
	@identifier nvarchar(20),
	@event_identifier nvarchar(30),
    @tax_payment_last_year nvarchar(800),
	@tax_debt_info nvarchar(800),
	@enforcement_proceedings_info nvarchar(800),
	@court_cases_info nvarchar(800),
	@criminal_administrative_cases_info nvarchar(800),
	@unscrupulous_participant_of_state_procurements nvarchar(800),
	@arrest_of_bank_balance nvarchar(800),
	@negative_info nvarchar(800)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE COMPANY_financial_solvency
	set 
		tax_payment_last_year = @tax_payment_last_year,
		tax_debt_info = @tax_debt_info,
		enforcement_proceedings_info = @enforcement_proceedings_info,
		court_cases_info= @court_cases_info,
		criminal_administrative_cases_info = @criminal_administrative_cases_info,
		unscrupulous_participant_of_state_procurements = @unscrupulous_participant_of_state_procurements,
		arrest_of_bank_balance = @arrest_of_bank_balance,
		negative_info = @negative_info 
	WHERE identifier = @identifier AND event_identifier = @event_identifier
	
END



GO
/****** Object:  StoredProcedure [dbo].[COMPANY_update_negative_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[COMPANY_update_negative_info]
	@identifier nvarchar(20),
	@event_identifier nvarchar(30),
	@management_negative_info nvarchar(800),
    @harm_to_companies_interests nvarchar(800),
    @international_sanctions nvarchar(800),
    @judicial_executive_authorities_sanctions nvarchar(800),
    @misrepresentations nvarchar(800),
    @anticorruption_reservation nvarchar(800),
    @inconsistency_of_contract_conditions nvarchar(800),
    @inconsistency_of_corporation_requirements nvarchar(800)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE COMPANY_negative
	SET 
		management_negative_info = @management_negative_info,
		harm_to_companies_interests = @harm_to_companies_interests,
		international_sanctions = @international_sanctions,
		judicial_executive_authorities_sanctions = @judicial_executive_authorities_sanctions,
		misrepresentations = @misrepresentations,
		anticorruption_reservation = @anticorruption_reservation,
		inconsistency_of_contract_conditions = @inconsistency_of_contract_conditions,
		inconsistency_of_corporation_requirements = @inconsistency_of_corporation_requirements,
		update_date = GETDATE()
	WHERE identifier = @identifier AND event_identifier = @event_identifier
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_add_contractor_check]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_add_contractor_check]
	@companyId nvarchar(2) = '01',
	@event_create_executor nvarchar(30),
	@executor_subdivision nvarchar(200),
	@event_start_date nvarchar(80),
	@event_control_date nvarchar(80),
	@event_status nvarchar(20),
	@event_outgoing_doc nvarchar(40),
	@event_doc_ground nvarchar(40),
	@event_object nvarchar(600),
	@event_subject nvarchar(20),
	@event_subject_of_contract nvarchar(60),
	@event_contract_amount nvarchar(60),
	@event_content nvarchar(600),
	@event_result nvarchar(20),
	@event_executor_conclusion nvarchar(20),
	@event_curator_conclusion nvarchar(20),
	@event_conclusion_description nvarchar(600)
AS
BEGIN
	SET NOCOUNT ON;


	DECLARE @date nvarchar(20) = (SELECT CONVERT(nvarchar, getdate(), 112))
	
	DECLARE @lastIdentifier nvarchar(30) = (SELECT identifier FROM dbo.EVENT_common WHERE id=(SELECT max(id) FROM dbo.EVENT_common))
	
	DECLARE @lastDate date = CONVERT(NVARCHAR, (SELECT PARSENAME(REPLACE(@lastIdentifier, '-','.'),3)), 105)   
	DECLARE @lastCounter nvarchar(6) = (SELECT PARSENAME(REPLACE(@lastIdentifier, '-','.'),2))
	DECLARE @currentCounter int = CASE WHEN @lastDate = CAST(GETDATE() as date) THEN (SELECT CONVERT(int, @lastCounter) + 1) ELSE 1 END
	DECLARE @identifier nvarchar(30) = (SELECT CONCAT(N'ДКМП', '-', @date, '-', REPLICATE('0',4-LEN(RTRIM(@currentCounter))) + RTRIM(@currentCounter), '-', '01'))


	INSERT INTO dbo.EVENT_common (event_create_executor, executor_subdivision, event_start_date, event_control_date, event_status, event_outgoing_doc, event_doc_ground, 
		event_object, event_subject, event_content, event_result, event_executor_conclusion, event_curator_conclusion, event_conclusion_description)
	VALUES (@event_create_executor, @executor_subdivision, CONVERT(date, @event_start_date, 103), CONVERT(date, @event_control_date, 103), @event_status, @event_outgoing_doc, @event_doc_ground, 
		@event_object, @event_subject, @event_content, @event_result, @event_executor_conclusion, @event_curator_conclusion, @event_conclusion_description)

	DECLARE @id int =SCOPE_IDENTITY()
	
	UPDATE dbo.EVENT_common
	SET identifier = @identifier
	WHERE id = @id 

	INSERT INTO dbo.EVENT_additional_fields (identifier, event_subject_of_contract, event_contract_amount, event_type)
	VALUES (@identifier, @event_subject_of_contract, @event_contract_amount, 'contractors_check')
    
	SELECT  identifier FROM  dbo.EVENT_common where id = @id 
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_add_contractor_monitoring]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_add_contractor_monitoring]
	@companyId nvarchar(2) = '01',
	@event_create_executor nvarchar(30),
	@executor_subdivision nvarchar(30),
	@event_start_date datetime,
	@event_control_date datetime,
	@event_status nvarchar(20),
	@event_outgoing_doc nvarchar(40),
	@event_doc_ground nvarchar(40),
	@event_object nvarchar(600),
	@event_subject nvarchar(20),
	@event_number_of_contract nvarchar(60),
	@event_subject_of_contract nvarchar(60),
	@event_contract_amount nvarchar(60),
	@event_contract_executor nvarchar(60),
	@event_content nvarchar(600),
	@event_result nvarchar(20),
	@event_executor_conclusion nvarchar(20),
	@event_curator_conclusion nvarchar(20),
	@event_conclusion_description nvarchar(600)
AS
BEGIN
	SET NOCOUNT ON;


	DECLARE @date nvarchar(20) = (SELECT CONVERT(nvarchar, getdate(), 112))
	
	DECLARE @lastIdentifier nvarchar(30) = (SELECT identifier FROM dbo.EVENT_common WHERE id=(SELECT max(id) FROM dbo.EVENT_common))
	
	DECLARE @lastDate date = CONVERT(NVARCHAR, (SELECT PARSENAME(REPLACE(@lastIdentifier, '-','.'),3)), 105)   
	DECLARE @lastCounter nvarchar(6) = (SELECT PARSENAME(REPLACE(@lastIdentifier, '-','.'),2))
	DECLARE @currentCounter int = CASE WHEN @lastDate = CAST(GETDATE() as date) THEN (SELECT CONVERT(int, @lastCounter) + 1) ELSE 1 END
	DECLARE @identifier nvarchar(30) = (SELECT CONCAT(N'ДКМП', '-', @date, '-', REPLICATE('0',4-LEN(RTRIM(@currentCounter))) + RTRIM(@currentCounter), '-', '01'))


	INSERT INTO dbo.EVENT_common (event_create_executor, executor_subdivision, event_start_date, event_control_date, event_status, event_outgoing_doc, event_doc_ground, 
		event_object, event_subject, event_content, event_result, event_executor_conclusion, event_curator_conclusion, event_conclusion_description)
	VALUES (@event_create_executor, @executor_subdivision, @event_start_date, @event_control_date, @event_status, @event_doc_ground, @event_outgoing_doc, @event_object, 
		@event_subject, @event_content, @event_result, @event_executor_conclusion, @event_curator_conclusion, @event_conclusion_description)

	DECLARE @id int =SCOPE_IDENTITY()
	
	UPDATE dbo.EVENT_common
	SET identifier = @identifier
	WHERE id = @id 
    
	INSERT INTO dbo.EVENT_additional_fields (identifier, event_number_of_contract, event_subject_of_contract, event_contract_amount, event_contract_executor, event_type)
	VALUES (@identifier, @event_number_of_contract, @event_subject_of_contract, @event_contract_amount, @event_contract_executor, 'contractors_monitoring')

	SELECT  identifier FROM  dbo.EVENT_common where id = @id 
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_add_information_search_activity]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_add_information_search_activity]
	@companyId nvarchar(2) = '01',
	@event_create_executor nvarchar(30),
	@executor_subdivision nvarchar(30),
	@event_start_date datetime,
	@event_control_date datetime,
	@event_status nvarchar(20),
	@event_doc_ground nvarchar(40),
	@event_outgoing_doc nvarchar(40),
	@event_object nvarchar(600),
	@event_subject nvarchar(20),
	@event_ISA_type nvarchar(200),
	@event_content nvarchar(600),
	@event_result nvarchar(20),
	@event_executor_conclusion nvarchar(20),
	@event_curator_conclusion nvarchar(20),
	@event_conclusion_description nvarchar(600)
AS
BEGIN
	SET NOCOUNT ON;


	DECLARE @date nvarchar(20) = (SELECT CONVERT(nvarchar, getdate(), 112))
	
	DECLARE @lastIdentifier nvarchar(30) = (SELECT identifier FROM dbo.EVENT_common WHERE id=(SELECT max(id) FROM dbo.EVENT_common))
	
	DECLARE @lastDate date = CONVERT(NVARCHAR, (SELECT PARSENAME(REPLACE(@lastIdentifier, '-','.'),3)), 105)   
	DECLARE @lastCounter nvarchar(6) = (SELECT PARSENAME(REPLACE(@lastIdentifier, '-','.'),2))
	DECLARE @currentCounter int = CASE WHEN @lastDate = CAST(GETDATE() as date) THEN (SELECT CONVERT(int, @lastCounter) + 1) ELSE 1 END
	DECLARE @identifier nvarchar(30) = (SELECT CONCAT(N'ДКМП', '-', @date, '-', REPLICATE('0',4-LEN(RTRIM(@currentCounter))) + RTRIM(@currentCounter), '-', '01'))


	INSERT INTO dbo.EVENT_common(event_create_executor, executor_subdivision, event_start_date, event_control_date, event_status, event_outgoing_doc, event_doc_ground, 
		event_object, event_subject, event_content, event_result, event_executor_conclusion, event_curator_conclusion,  event_conclusion_description)
	VALUES (@event_create_executor, @executor_subdivision, @event_start_date, @event_control_date, @event_status, @event_outgoing_doc, @event_doc_ground, @event_object, 
		@event_subject, @event_content, @event_result, @event_executor_conclusion, @event_curator_conclusion, @event_conclusion_description)

	DECLARE @id int =SCOPE_IDENTITY()
	
	UPDATE dbo.EVENT_common
	SET identifier = @identifier
	WHERE id = @id 
    
	INSERT INTO dbo.EVENT_additional_fields (identifier, event_ISA_type, event_type)
	VALUES (@identifier, @event_ISA_type, 'information_search_activity')

	SELECT  identifier FROM  dbo.EVENT_common where id = @id 
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_add_personnel_check]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_add_personnel_check]
	@companyId nvarchar(2) = '01',
	@event_create_executor nvarchar(30),
	@executor_subdivision nvarchar(200),
	@event_start_date datetime,
	@event_control_date datetime,
	@event_status nvarchar(20),
	@event_outgoing_doc nvarchar(40),
	@event_doc_ground nvarchar(40),
	@event_object nvarchar(800),
	@event_subject nvarchar(20),
	@event_vacant_position nvarchar(60),
	@event_transfer_position nvarchar(60),
	@event_content nvarchar(600),
	@event_result nvarchar(20),
	@event_executor_conclusion nvarchar(20),
	@event_curator_conclusion nvarchar(20),
	@event_conclusion_description nvarchar(600)
AS
BEGIN
	SET NOCOUNT ON;


	DECLARE @date nvarchar(20) = (SELECT CONVERT(nvarchar, getdate(), 112))
	
	DECLARE @lastIdentifier nvarchar(30) = (SELECT identifier FROM dbo.EVENT_common WHERE id=(SELECT max(id) FROM dbo.EVENT_common))
	
	DECLARE @lastDate date = CONVERT(NVARCHAR, (SELECT PARSENAME(REPLACE(@lastIdentifier, '-','.'),3)), 105)   
	DECLARE @lastCounter nvarchar(6) = (SELECT PARSENAME(REPLACE(@lastIdentifier, '-','.'),2))
	DECLARE @currentCounter int = CASE WHEN @lastDate = CAST(GETDATE() as date) THEN (SELECT CONVERT(int, @lastCounter) + 1) ELSE 1 END
	DECLARE @identifier nvarchar(30) = (SELECT CONCAT(N'ДКМП', '-', @date, '-', REPLICATE('0',4-LEN(RTRIM(@currentCounter))) + RTRIM(@currentCounter), '-', '01'))


	INSERT INTO dbo.EVENT_common (event_create_executor, executor_subdivision, event_start_date, event_control_date, event_status, event_outgoing_doc, event_doc_ground, 
		event_object, event_subject, event_content, event_result, event_executor_conclusion, event_curator_conclusion, event_conclusion_description, event_type)
	VALUES (@event_create_executor, @executor_subdivision, @event_start_date, @event_control_date, @event_status, @event_outgoing_doc, @event_doc_ground, @event_object, @event_subject, 
		@event_content, @event_result, @event_executor_conclusion, @event_curator_conclusion, @event_conclusion_description, N'personnel_check')

	DECLARE @id int =SCOPE_IDENTITY()
	
	UPDATE dbo.EVENT_common
	SET identifier = @identifier
	WHERE id = @id 

	INSERT INTO dbo.EVENT_additional_fields (identifier, event_vacant_position, event_transfer_position, event_type)
	VALUES (@identifier, @event_vacant_position, @event_transfer_position, 'personnel_check')

	SELECT  identifier FROM  dbo.EVENT_common where id = @id 
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_add_personnel_monitoring]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_add_personnel_monitoring]
	@companyId nvarchar(2) = '01',
	@event_create_executor nvarchar(30),
	@executor_subdivision nvarchar(30),
	@event_start_date datetime,
	@event_control_date datetime,
	@event_status nvarchar(20),
	@event_outgoing_doc nvarchar(40),
	@event_doc_ground nvarchar(40),
	@event_object nvarchar(600),
	@event_subject nvarchar(20),
	@event_person_position nvarchar(80),
	@event_content nvarchar(600),
	@event_result nvarchar(20),
	@event_executor_conclusion nvarchar(20),
	@event_curator_conclusion nvarchar(20),
	@event_conclusion_description nvarchar(600)
AS
BEGIN
	SET NOCOUNT ON;


	DECLARE @date nvarchar(20) = (SELECT CONVERT(nvarchar, getdate(), 112))
	
	DECLARE @lastIdentifier nvarchar(30) = (SELECT identifier FROM dbo.EVENT_common WHERE id=(SELECT max(id) FROM dbo.EVENT_common))
	
	DECLARE @lastDate date = CONVERT(NVARCHAR, (SELECT PARSENAME(REPLACE(@lastIdentifier, '-','.'),3)), 105)   
	DECLARE @lastCounter nvarchar(6) = (SELECT PARSENAME(REPLACE(@lastIdentifier, '-','.'),2))
	DECLARE @currentCounter int = CASE WHEN @lastDate = CAST(GETDATE() as date) THEN (SELECT CONVERT(int, @lastCounter) + 1) ELSE 1 END
	DECLARE @identifier nvarchar(30) = (SELECT CONCAT(N'ДКМП', '-', @date, '-', REPLICATE('0',4-LEN(RTRIM(@currentCounter))) + RTRIM(@currentCounter), '-', '01'))


	INSERT INTO dbo.EVENT_common(event_create_executor, executor_subdivision, event_start_date, event_control_date, event_status, event_outgoing_doc, event_doc_ground, 
		event_object, event_subject, event_content, event_result, event_executor_conclusion, event_curator_conclusion, event_conclusion_description)
	VALUES (@event_create_executor, @executor_subdivision, @event_start_date, @event_control_date, @event_status, @event_outgoing_doc, @event_doc_ground, @event_object, 
		@event_subject, @event_content, @event_result, @event_executor_conclusion, @event_curator_conclusion, @event_conclusion_description)

	DECLARE @id int =SCOPE_IDENTITY()
	
	UPDATE dbo.EVENT_common
	SET identifier = @identifier
	WHERE id = @id 
    
	INSERT INTO dbo.EVENT_additional_fields (identifier, event_person_position, event_type)
	VALUES (@identifier, @event_person_position, 'personnel_monitoring')

	SELECT  identifier FROM  dbo.EVENT_common where id = @id 
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_get_all]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_get_all]

AS
BEGIN
	SET NOCOUNT ON;


	SELECT identifier, event_start_date, event_doc_ground, event_step, event_type, event_supervisor_2_conclusion, event_subject,
		event_executor_conclusion, event_curator_conclusion
	FROM dbo.EVENT_common order by id desc
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_get_all_personnel]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_get_all_personnel]

AS
BEGIN
	SET NOCOUNT ON;

	
	SELECT * FROM dbo.EVENT_personnel_monitoring
	
END


GO
/****** Object:  StoredProcedure [dbo].[EVENT_get_by_contractor]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_get_by_contractor]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ec.*,
	eaf.event_vacant_position, eaf.event_transfer_position, eaf.event_subject_of_contract, eaf.event_contract_amount, eaf.event_person_position, eaf.event_number_of_contract,
	eaf.event_contract_executor, eaf.event_ISA_type
	FROM dbo.EVENT_common ec
	LEFT JOIN dbo.EVENT_additional_fields eaf
	ON ec.identifier = eaf.identifier AND ec.event_type = eaf.event_type
	WHERE ec.event_subject = @id
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_get_by_id]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_get_by_id]
	@id nvarchar(30) 
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ec.event_create_executor,
		ec.executor_subdivision,
		ec.event_start_date,
		ec.event_control_date,
		ec.event_status,
		ec.event_outgoing_doc,
		ec.event_doc_ground,
		ec.event_object,
		ec.event_subject,
		ec.event_content,
		ec.event_result,
		ec.event_executor_conclusion,
		ec.event_curator_conclusion,
		ec.event_supervisor_1_conclusion,
		ec.event_supervisor_2_conclusion,
		ec.event_conclusion_description,
		ec.event_supervisor_description,
		ec.event_end_date
	, eaf.*
	FROM  EVENT_common ec
	LEFT JOIN EVENT_additional_fields eaf
	ON ec.identifier = eaf.identifier
	WHERE ec.identifier = @id
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_get_by_person]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_get_by_person]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ec.*,
	eaf.event_vacant_position, eaf.event_transfer_position, eaf.event_subject_of_contract, eaf.event_contract_amount, eaf.event_person_position, eaf.event_number_of_contract,
	eaf.event_contract_executor, eaf.event_ISA_type
	FROM dbo.EVENT_common ec
	LEFT JOIN dbo.EVENT_additional_fields eaf
	ON ec.identifier = eaf.identifier AND ec.event_type = eaf.event_type
	WHERE ec.event_subject = @id
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_update_contractor_check]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_update_contractor_check]
	@companyId nvarchar(2) = '01',
	@identifier nvarchar(30),
	@event_create_executor nvarchar(40),
	@executor_subdivision nvarchar(200),
	@event_start_date datetime,
	@event_control_date datetime,
	@event_status nvarchar(20),
	@event_outgoing_doc nvarchar(40),
	@event_doc_ground nvarchar(40),
	@event_object nvarchar(600),
	@event_subject nvarchar(20),
	@event_subject_of_contract nvarchar(60),
	@event_contract_amount nvarchar(60),
	@event_content nvarchar(600),
	@event_result nvarchar(20),
	@event_executor_conclusion nvarchar(20),
	@event_curator_conclusion nvarchar(20),
	@event_conclusion_description nvarchar(600),
	@event_supervisor_1_conclusion nvarchar(20),
	@event_supervisor_2_conclusion nvarchar(20),
	@event_supervisor_description nvarchar(600)
AS
BEGIN
	SET NOCOUNT ON;


	UPDATE dbo.EVENT_common
	SET event_start_date = CONVERT(date, @event_start_date, 103),
	event_control_date = CONVERT(date, @event_control_date, 103),
	event_status = @event_status,
	event_outgoing_doc = @event_outgoing_doc,
	event_doc_ground = @event_doc_ground,
	event_object = event_object,
	event_subject = @event_subject,
	event_content = @event_content,
	event_result = @event_result,
	event_executor_conclusion = @event_executor_conclusion,
	event_curator_conclusion = @event_curator_conclusion,
	event_conclusion_description = @event_conclusion_description,
	event_supervisor_1_conclusion = @event_supervisor_1_conclusion,
	event_supervisor_2_conclusion = @event_supervisor_2_conclusion,
	event_supervisor_description = @event_supervisor_description,
	event_end_date = GETDATE()

	WHERE identifier = @identifier

	IF @event_supervisor_2_conclusion IS NOT NULL 
		BEGIN
			UPDATE dbo.EVENT_common
			SET event_end_date = GETDATE()
		END

	UPDATE dbo.EVENT_additional_fields
	SET event_subject_of_contract = @event_subject_of_contract,
	event_contract_amount = @event_contract_amount
	WHERE identifier = @identifier AND event_type='contractors_check'
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_update_contractor_monitoring]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_update_contractor_monitoring]
	@companyId nvarchar(2) = '01',
	@identifier nvarchar(30),
	@event_create_executor nvarchar(30),
	@executor_subdivision nvarchar(30),
	@event_start_date datetime,
	@event_control_date datetime,
	@event_status nvarchar(20),
	@event_outgoing_doc nvarchar(40),
	@event_doc_ground nvarchar(40),
	@event_object nvarchar(600),
	@event_subject nvarchar(20),
	@event_number_of_contract nvarchar(60),
	@event_subject_of_contract nvarchar(60),
	@event_contract_amount nvarchar(60),
	@event_contract_executor nvarchar(60),
	@event_content nvarchar(600),
	@event_result nvarchar(20),
	@event_executor_conclusion nvarchar(20),
	@event_curator_conclusion nvarchar(20),
	@event_conclusion_description nvarchar(600),
	@event_supervisor_1_conclusion nvarchar(20),
	@event_supervisor_2_conclusion nvarchar(20),
	@event_supervisor_description nvarchar(600)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE dbo.EVENT_common
	SET event_start_date = @event_start_date,
	event_control_date = @event_control_date,
	event_status = @event_status,
	event_outgoing_doc = @event_outgoing_doc,
	event_doc_ground = @event_doc_ground,
	event_object = event_object,
	event_subject = @event_subject,
	event_content = @event_content,
	event_result = @event_result,
	event_executor_conclusion = @event_executor_conclusion,
	event_curator_conclusion = @event_curator_conclusion,
	event_conclusion_description = @event_conclusion_description,
	event_supervisor_1_conclusion = @event_supervisor_1_conclusion,
	event_supervisor_2_conclusion = @event_supervisor_2_conclusion,
	event_supervisor_description = @event_supervisor_description,
	event_end_date = GETDATE()
	WHERE identifier = @identifier

	IF @event_supervisor_2_conclusion IS NOT NULL 
		BEGIN
			UPDATE dbo.EVENT_common
			SET event_end_date = GETDATE()
		END

	UPDATE dbo.EVENT_additional_fields
	SET event_number_of_contract = @event_number_of_contract,
	event_subject_of_contract = @event_subject_of_contract,
	event_contract_amount = @event_contract_amount,
	event_contract_executor = @event_contract_executor
	WHERE identifier = @identifier AND event_type='contractors_monitoring'
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_update_event_subject]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_update_event_subject]
	@eventIdentifier nvarchar(30),
	@identifier nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE dbo.EVENT_common
	SET event_subject = @identifier
	WHERE identifier = @eventIdentifier
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_update_information_search_activity]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_update_information_search_activity]
	@companyId nvarchar(2) = '01',
	@identifier nvarchar(30),
	@event_create_executor nvarchar(30),
	@executor_subdivision nvarchar(30),
	@event_start_date datetime,
	@event_control_date datetime,
	@event_status nvarchar(20),
	@event_outgoing_doc nvarchar(40),
	@event_doc_ground nvarchar(40),
	@event_object nvarchar(600),
	@event_subject nvarchar(20),
	@event_ISA_type nvarchar(200),
	@event_content nvarchar(600),
	@event_result nvarchar(20),
	@event_executor_conclusion nvarchar(20),
	@event_curator_conclusion nvarchar(20),
	@event_conclusion_description nvarchar(600),
	@event_supervisor_1_conclusion nvarchar(20),
	@event_supervisor_2_conclusion nvarchar(20),
	@event_supervisor_description nvarchar(600)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE dbo.EVENT_common
	SET event_start_date = @event_start_date,
	event_control_date = @event_control_date,
	event_status = @event_status,
	event_outgoing_doc = @event_outgoing_doc,
	event_doc_ground = @event_doc_ground,
	event_object = event_object,
	event_subject = @event_subject,
	event_content = @event_content,
	event_result = @event_result,
	event_executor_conclusion = @event_executor_conclusion,
	event_curator_conclusion = @event_curator_conclusion,
	event_conclusion_description = @event_conclusion_description,
	event_supervisor_1_conclusion = @event_supervisor_1_conclusion,
	event_supervisor_2_conclusion = @event_supervisor_2_conclusion,
	event_supervisor_description = @event_supervisor_description,
	event_end_date = GETDATE()
	WHERE identifier = @identifier


	IF @event_supervisor_2_conclusion IS NOT NULL 
		BEGIN
			UPDATE dbo.EVENT_common
			SET event_end_date = GETDATE()
		END

	UPDATE dbo.EVENT_additional_fields
	SET event_ISA_type = @event_ISA_type
	WHERE identifier = @identifier AND event_type='information_search_activity'
	
END
GO
/****** Object:  StoredProcedure [dbo].[EVENT_update_personnel_check]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_update_personnel_check]
	@companyId nvarchar(2) = '01',
	@identifier nvarchar(30),
	@event_create_executor nvarchar(40),
	@executor_subdivision nvarchar(200),
	@event_start_date nvarchar(80),
	@event_control_date nvarchar(80),
	@event_status nvarchar(20),
	@event_outgoing_doc nvarchar(40),
	@event_doc_ground nvarchar(40),
	@event_object nvarchar(600),
	@event_subject nvarchar(20),
	@event_vacant_position nvarchar(60),
	@event_transfer_position nvarchar(60),
	@event_content nvarchar(600),
	@event_result nvarchar(20),
	@event_executor_conclusion nvarchar(20),
	@event_curator_conclusion nvarchar(20),
	@event_conclusion_description nvarchar(600),
	@event_supervisor_1_conclusion nvarchar(20),
	@event_supervisor_2_conclusion nvarchar(20),
	@event_supervisor_description nvarchar(600)
AS
BEGIN
	SET NOCOUNT ON;


	UPDATE dbo.EVENT_common
	SET event_start_date = CONVERT(date, @event_start_date, 103),
	event_control_date = CONVERT(date, @event_control_date, 103),
	event_status = @event_status,
	event_doc_ground = @event_doc_ground,
	event_outgoing_doc = @event_outgoing_doc,
	event_object = event_object,
	event_subject = @event_subject,
	event_content = @event_content,
	event_result = @event_result,
	event_executor_conclusion = @event_executor_conclusion,
	event_curator_conclusion = @event_curator_conclusion,
	event_conclusion_description = @event_conclusion_description,
	event_supervisor_1_conclusion = @event_supervisor_1_conclusion,
	event_supervisor_2_conclusion = @event_supervisor_2_conclusion,
	event_supervisor_description = @event_supervisor_description
	
	WHERE identifier = @identifier

	IF @event_supervisor_2_conclusion IS NOT NULL 
		BEGIN
			UPDATE dbo.EVENT_common
			SET event_end_date = GETDATE()
		END

	UPDATE dbo.EVENT_additional_fields
	SET event_vacant_position = @event_vacant_position,
	event_transfer_position = @event_transfer_position
	WHERE identifier = @identifier AND event_type = 'personnel_check'

END

GO
/****** Object:  StoredProcedure [dbo].[EVENT_update_personnel_monitoring]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[EVENT_update_personnel_monitoring]
	@companyId nvarchar(2) = '01',
	@identifier nvarchar(30),
	@register_number nvarchar(40),
	@event_create_executor nvarchar(30),
	@executor_subdivision nvarchar(30),
	@event_start_date datetime,
	@event_control_date datetime,
	@event_status nvarchar(20),
	@event_outgoing_doc nvarchar(40),
	@event_doc_ground nvarchar(40),
	@event_object nvarchar(600),
	@event_subject nvarchar(20),
	@event_person_position nvarchar(80),
	@event_content nvarchar(600),
	@event_result nvarchar(20),
	@event_executor_conclusion nvarchar(20),
	@event_curator_conclusion nvarchar(20),
	@event_conclusion_description nvarchar(600),
	@event_supervisor_1_conclusion nvarchar(20),
	@event_supervisor_2_conclusion nvarchar(20),
	@event_supervisor_description nvarchar(600)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE dbo.EVENT_common
	SET
	event_start_date = @event_start_date,
	event_control_date = @event_control_date,
	event_status = @event_status,
	event_outgoing_doc = @event_outgoing_doc,
	event_doc_ground = @event_doc_ground,
	event_object = event_object,
	event_subject = @event_subject,
	event_content = @event_content,
	event_result = @event_result,
	event_executor_conclusion = @event_executor_conclusion,
	event_curator_conclusion = @event_curator_conclusion,
	event_conclusion_description = @event_conclusion_description,
	event_supervisor_1_conclusion = @event_supervisor_1_conclusion,
	event_supervisor_2_conclusion = @event_supervisor_2_conclusion,
	event_supervisor_description = @event_supervisor_description,
	event_end_date = GETDATE()
	WHERE identifier = @identifier

	IF @event_supervisor_2_conclusion IS NOT NULL 
		BEGIN
			UPDATE dbo.EVENT_common
			SET event_end_date = GETDATE()
		END

	UPDATE dbo.EVENT_additional_fields
	SET event_person_position = @event_person_position
	WHERE identifier = @identifier AND event_type='personnel_monitoring'
    
END

GO
/****** Object:  StoredProcedure [dbo].[FILES_delete_path]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[FILES_delete_path]
	@filepath nvarchar(60)
AS
BEGIN
	SET NOCOUNT ON;

	--INSERT INTO dbo.FILES_documents_path(identifier, input_type, filepath, event_identifier)
	--VALUES (@identifier, @inputType, @filepath, @eventIdentifier)

	DELETE FROM dbo.FILES_documents_path
	WHERE filepath = @filepath

END


GO
/****** Object:  StoredProcedure [dbo].[FILES_save_path]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[FILES_save_path]
	@identifier nvarchar(20),
	@eventIdentifier nvarchar(30),
	@inputType nvarchar(40),
	@filepath nvarchar(60)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.FILES_documents_path(identifier, input_type, filepath, event_identifier)
	VALUES (@identifier, @inputType, @filepath, @eventIdentifier)
	
END


GO
/****** Object:  StoredProcedure [dbo].[NOTIFICATION_add_to_approve]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[NOTIFICATION_add_to_approve]
	@roleId int,
	@eventIdentifier nvarchar(30),
	@conclusion nvarchar(30),
	@email nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @isEmpty nvarchar(30) = (SELECT event_identifier FROM dbo.NOTIFICATION_registry WHERE event_identifier = @eventIdentifier)

	IF @isEmpty IS NOT NULL
		BEGIN
			UPDATE dbo.NOTIFICATION_registry 
			SET role_id = @roleId,
				current_user_login = @email,
				update_date = GETDATE()
			WHERE event_identifier = @eventIdentifier
		END
	ELSE
		INSERT INTO dbo.NOTIFICATION_registry (event_identifier, role_id, current_user_login, notification_status, create_date)
		VALUES (@eventIdentifier, @roleId, @email, N'На согласование', GETDATE() )

END










	--IF @role_id = 1  OR @role_id = 2
	--	BEGIN
	--		INSERT INTO dbo.EVENT_conclusions (event_identifier, conclusion_step, conclusion_status, conclusion_description)
	--		VALUES (@identifier, 2, @event_conclusion, N'На проверке у куратора')
	--		EXEC [dbo].[NOTIFICATION_add_to_approve] @role_id = 1, @event_identifier = @identifier
	--	END
	--END

	--IF 


	--IF @role_id = 2
	--	BEGIN 
	--		IF @event_conclusion = N'Согласован'
	--			BEGIN 
	--				INSERT INTO dbo.EVENT_conclusions (event_identifier, conclusion_step, conclusion_status, conclusion_description)
	--				VALUES (@identifier, 4, @event_conclusion, N'На проверке у начальника ОБ')
	--				EXEC [dbo].[NOTIFICATION_add_to_approve] @role_id = 2, @event_identifier = @identifier
	--			END 
	--		ELSE IF @event_conclusion = N'Не согласован' OR @is_supervisor = 1 
	--			BEGIN
	--				INSERT INTO dbo.EVENT_conclusions (event_identifier, conclusion_step, conclusion_status, conclusion_description)
	--				VALUES (@identifier, 3, @event_conclusion, N'На проверке у начальника УЭБ')
	--				EXEC [dbo].[NOTIFICATION_add_to_approve] @role_id = 2, @event_identifier = @identifier
	--			END 
	--	END 
GO
/****** Object:  StoredProcedure [dbo].[NOTIFICATION_get_by_user]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[NOTIFICATION_get_by_user]
	@email nvarchar(60)
AS
BEGIN
	SET NOCOUNT ON;

	/*SELECT * , au.last_name, au.first_name, au.middle_name
	FROM NOTIFICATION_registry nr
	LEFT JOIN ADMIN_users au
	ON nr.current_user_login = au.login
	WHERE current_user_login = @email*/

		SELECT nr.event_identifier AS eventIdentifier, nr.notification_status AS notificationStatus
	FROM NOTIFICATION_registry nr
	LEFT JOIN ADMIN_users au
	ON nr.current_user_login = au.login
	WHERE current_user_login = @email
END
GO
/****** Object:  StoredProcedure [dbo].[NOTIFICATION_send_email]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[NOTIFICATION_send_email]
	@eventIdentifier nvarchar(30),
	@email nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @body nvarchar(max) = (SELECT CONCAT (N'Мероприятие', ' ',@eventIdentifier , ' ',N'поступило на согласование', char(13) + char(10) , N'перейдите поссылке: http://zhezapp02:8188/login'))
	DECLARE @title nvarchar(400) = (SELECT CONCAT (N'Мероприятие', ' ',@eventIdentifier , ' ',N'поступило на согласование'))


	exec msdb.dbo.sp_send_dbmail
            @profile_name = 'Surmail', 
			@recipients = 'Zhalgas.Zhunusov@kazakhmys.kz',
			@body = @body, 
			@subject = @title, 
			@body_format = 'html'
END
GO
/****** Object:  StoredProcedure [dbo].[NOTIFICATION_update_approve]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[NOTIFICATION_update_approve]
	@roleId int,
	@eventIdentifier nvarchar(30),
	@conclusion nvarchar(30),
	@email nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE dbo.NOTIFICATION_registry 
	SET role_id = @roleId,
		current_user_login = @email,
		update_date = GETDATE()
	WHERE event_identifier = @eventIdentifier
END

--select * from dbo.ADMIN_users
--select * from EVENT_common

--ALTER TABLE EVENT_common
--ALTER COLUMN executor_subdivision nvarchar(80)

--select * from dbo.NOTIFICATION_registry
GO
/****** Object:  StoredProcedure [dbo].[PERSON_add_affiliations]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_add_affiliations]
	@identifier nvarchar(20),
	@affIdentifier nvarchar(20),
	@affType int
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.COMPANY_affiliations (affiliated_from, affiliated_to, affiliation_type_id)
	VALUES (@identifier, @affIdentifier, @affType)

	INSERT INTO dbo.COMPANY_affiliations_info (identifier, affiliation_identifier, affiliation_detect_date, affiliation_status, affiliation_type_id)
	VALUES (@identifier, @affIdentifier, GETDATE(), N'активный', @affType)

END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_add_career]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_add_career]
	@identifier nvarchar(20),
	@company_name nvarchar(400),
	@start_date datetime,
	@end_date datetime,
	@job_position nvarchar(400)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.PERSON_career (identifier, company_name, start_date, end_date, job_position, create_date)
	VALUES (@identifier, @company_name, @start_date, @end_date, @job_position, GETDATE())
	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_add_education]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_add_education]
	@identifier nvarchar(20),
	@edu_type nvarchar(40),
	@edu_name nvarchar(600),
	@start_date datetime,
	@end_date datetime,
	@specialization nvarchar(600) = null,
	@qualification nvarchar(600) = null
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.PERSON_education (edu_institution_name, identifier, start_date, end_date, specialization, qualification, create_date, education_type)
	VALUES (@edu_name, @identifier, @start_date, @end_date, @specialization, @qualification, GETDATE(), @edu_type)
	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_add_family_member]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_add_family_member]
	@identifier nvarchar(20),
	@last_name nvarchar(30),
	@first_name nvarchar(30),
	@middle_name nvarchar(30),
	@birthdate datetime,
	@iin nvarchar(16),
	@work_place nvarchar(400),
	@family_status nvarchar(60)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.PERSON_family_member (identifier, last_name, first_name, middle_name, birthdate, iin, work_place, family_status, create_date)
	VALUES (@identifier, @last_name, @first_name, @middle_name, @birthdate, @iin, @work_place, @family_status, GETDATE())
	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_add_financial_solvency]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_add_financial_solvency]
	@identifier nvarchar(20),
	@event_identifier nvarchar(30),
	@tax_debt nvarchar(800),
	@enforcement_proceedings nvarchar(800),
	@KZ_departure_ban nvarchar(800),
	@legal_entity nvarchar(800),
	--@criminal_liability_info nvarchar(800),
	--@administrative_responsibility_info nvarchar(800),
	@court_cases nvarchar(800),
	@negative_info nvarchar(800)
AS
BEGIN
	SET NOCOUNT ON;

	IF NOT EXISTS( SELECT identifier FROM dbo.PERSON_financial_solvency where identifier = @identifier AND event_identifier = @event_identifier)
	BEGIN
		INSERT INTO PERSON_financial_solvency (identifier, event_identifier, tax_debt, enforcement_proceedings, KZ_departure_ban, 
		legal_entity, court_cases, negative_info, create_date)
		VALUES (@identifier, @event_identifier, @tax_debt, @enforcement_proceedings, @KZ_departure_ban, 
		@legal_entity, @court_cases, @negative_info, GETDATE())
	END
	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_add_negative_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_add_negative_info]
	@identifier nvarchar(600),
	@event_identifier nvarchar(30),
	@erdr_info nvarchar(800),
	@criminal_offense nvarchar(800),
	@disengagement nvarchar(800),
	@administrative_responsibility nvarchar(800),
	@unreimbursed_damage nvarchar(800),
	@presense_of_family_ties nvarchar(800),
	@presence_of_disciplinary_action nvarchar(800),
	@suspension_from_work nvarchar(800),
	@termination_of_contract nvarchar(800),
	@criminal_record nvarchar(800),
	@criminal_remission nvarchar(800),
	@personal_sanctions nvarchar(800),
	@db_data_check nvarchar(800),
	@police_data_check nvarchar(800),
	@family_negative_info nvarchar(800)
AS
BEGIN
	SET NOCOUNT ON;

	IF NOT EXISTS( SELECT identifier FROM dbo.PERSON_negative where identifier = @identifier AND event_identifier = @event_identifier)
	BEGIN
		INSERT INTO dbo.PERSON_negative
			(identifier, event_identifier, erdr_info, criminal_offense, unreimbursed_damage, presense_of_family_ties, disengagement,
			administrative_responsibility, presence_of_disciplinary_action, suspension_from_work,termination_of_contract, criminal_record, 
			criminal_remission, personal_sanctions, create_date, db_data_check, police_data_check, family_negative_info) 
		VALUES 
			(@identifier, @event_identifier, @erdr_info, @criminal_offense, @unreimbursed_damage, @presense_of_family_ties, @disengagement,
			@administrative_responsibility, @presence_of_disciplinary_action, @suspension_from_work, @termination_of_contract, @criminal_record, 
			@criminal_remission, @personal_sanctions, GETDATE(), @db_data_check, @police_data_check, @family_negative_info) 
		
	END
END
GO
/****** Object:  StoredProcedure [dbo].[PERSON_add_new]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_add_new]
	@last_name nvarchar(30),
	@first_name nvarchar(30),
	@middle_name nvarchar(30),
	@birthdate nvarchar(80),
	@birthplace nvarchar(80),
	@identification nvarchar(20),
	@iin nvarchar(16),
	@citizenship nvarchar(100),
	@family_status nvarchar(20),
	@phone_number nvarchar(20),
	@legal_address nvarchar(400),
	@actual_address nvarchar(400)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.PERSON_info (last_name, first_name, middle_name, birthdate, birthplace, identification, iin, citizenship, family_status, phone_number, legal_address, actual_address)
	VALUES (@last_name, @first_name, @middle_name, CONVERT(date, @birthdate, 103), @birthplace, @identification, @iin, @citizenship, @family_status, @phone_number, @legal_address, @actual_address)

	DECLARE @id int =SCOPE_IDENTITY()
    DECLARE @identifier nvarchar(20) = (SELECT CONCAT(N'ДСЛЦ',REPLICATE('0',6-LEN(RTRIM(@id))) + RTRIM(@id)))

	UPDATE dbo.PERSON_info
	SET identifier = @identifier
	where id = @id

	SELECT @identifier as identifier

END


GO
/****** Object:  StoredProcedure [dbo].[PERSON_delete_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_delete_info]
	@filepath nvarchar(60)
AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM PERSON_financial_documents where filepath = @filepath
	
END
GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_all]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_all]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM PERSON_info

	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_all_data]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_all_data]
	

AS
BEGIN
	SET NOCOUNT ON;

	SELECT distinct pd.identifier, pd.first_name as 'Имя', pd.last_name as 'Фамилия',  pd.middle_name as 'Отчество', pd.birthdate as 'Дата рождения', pd.iin as 'ИИН', 
	pd.citizenship as 'Гражданство', pd.family_status as 'Семейное положение', pd.phone_number as 'Номер Телефона',
	pd.legal_address as 'Адрес прописки', pd.actual_address as 'Адрес проживания',
	(SELECT TOP(1) ped.edu_institution_name    FROM PERSON_education ped WHERE  ped.identifier = pd.identifier) as 'Название учебного места',
	(SELECT TOP(1)  ped.start_date  FROM PERSON_education ped WHERE  ped.identifier = pd.identifier) as 'Дата начала учебы',
	(SELECT TOP(1)  ped.end_date  FROM PERSON_education ped WHERE  ped.identifier = pd.identifier) as 'Дата окончания учебы',
	(SELECT TOP(1)  ped.specialization  FROM PERSON_education ped WHERE  ped.identifier = pd.identifier) as 'Специальность',
	(SELECT TOP(1)   ped.qualification  FROM PERSON_education ped WHERE  ped.identifier = pd.identifier) as 'Квалификация',
	(SELECT TOP(1)   pfs.tax_debt_info  FROM PERSON_financial_solvency pfs WHERE  pfs.identifier = pd.identifier) as 'Наличие налоговых задолженностей',
	(SELECT TOP(1)   pfs.enforcement_proceedings_info  FROM PERSON_financial_solvency pfs WHERE  pfs.identifier = pd.identifier) as 'Наличие исполнительных производств',
	(SELECT TOP(1)   pfs.criminal_liability_info  FROM PERSON_financial_solvency pfs WHERE  pfs.identifier = pd.identifier) as 'Наличие уголовных дел',
	(SELECT TOP(1)   pfs.administrative_responsibility_info  FROM PERSON_financial_solvency pfs WHERE  pfs.identifier = pd.identifier) as 'Наличие административных дел',
	(SELECT TOP(1)   pfs.KZ_departure_ban_info  FROM PERSON_financial_solvency pfs WHERE  pfs.identifier = pd.identifier) as 'Наличие запрета на выезд из РК',
	(SELECT TOP(1)   pfs.court_cases_info  FROM PERSON_financial_solvency pfs WHERE  pfs.identifier = pd.identifier) as 'Наличие судебных дел',
	(SELECT TOP(1)   pfs.negative_info  FROM PERSON_financial_solvency pfs WHERE  pfs.identifier = pd.identifier) as 'Наличие негативной информации'
	--pfm.work_place as 'Место работы'
	
	--pc.company_name, pc.job_position
	--pfs.tax_debt_info, pfs.enforcement_proceedings_info, pfs.KZ_departure_ban_info,
	--pfs.criminal_liability_info, pfs.administrative_responsibility_info,
	--pfs.court_cases_info, pfs.negative_info

	FROM PERSON_info pd 
	

END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_all_data_by_id]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_all_data_by_id]
	@id nvarchar(20),
	@eventId nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.PERSON_info where identifier = @id
	SELECT * FROM dbo.PERSON_education where identifier = @id
	SELECT * FROM dbo.PERSON_career where identifier = @id
	SELECT * FROM dbo.PERSON_family_member where identifier = @id
	SELECT * FROM dbo.PERSON_financial_solvency where identifier = @id
	SELECT * FROM dbo.PERSON_negative where identifier = @id
	--SELECT * FROM dbo.EVENT_common where identifier = @eventId

	SELECT ec.event_create_executor,
		ec.executor_subdivision,
		ec.event_start_date,
		ec.event_control_date,
		ec.event_status,
		ec.event_doc_ground,
		ec.event_object,
		ec.event_subject,
		ec.event_content,
		ec.event_result,
		ec.event_executor_conclusion,
		ec.event_curator_conclusion,
		ec.event_supervisor_1_conclusion,
		ec.event_supervisor_2_conclusion,
		ec.event_conclusion_description,
		ec.event_supervisor_description,
		ec.event_end_date
	, eaf.*
	FROM  EVENT_common ec
	LEFT JOIN EVENT_additional_fields eaf
	ON ec.identifier = eaf.identifier
	WHERE ec.identifier = @eventId
	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_all_financial_solvency]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_all_financial_solvency]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * 
	FROM PERSON_financial_solvency WHERE identifier = @id 

	select * from FILES_documents_path WHERE identifier=@id

	--select * from FILES_documents_path 
	--pivot 
	--(max(inp) for [] ) as pvt

	--select id, [tax_debt], [enforcement_proceedings], [KZ_departure_ban]
	--FROM (SELECT id, input_type, filepath FROM FILES_documents_path) as s
	--PIVOT (max(filepath) for input_type IN ([tax_debt], [enforcement_proceedings], [KZ_departure_ban])) as p
	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_all_negative_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_all_negative_info]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.PERSON_negative WHERE identifier = @id 
	select * from FILES_documents_path WHERE identifier=@id
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_by_id]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_by_id]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT identifier, last_name, first_name, middle_name,   birthdate,
	birthplace, identification, iin, citizenship, family_status, phone_number, legal_address, actual_address
	FROM PERSON_info WHERE identifier = @id

	SELECT input_type, filepath FROM dbo.FILES_documents_path
	WHERE identifier = @id
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_career]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_career]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM PERSON_career WHERE identifier = @id;

	SELECT input_type, filepath FROM dbo.FILES_documents_path
	WHERE identifier = @id
	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_citizenship]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_citizenship]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT country as value, country as label FROM dbo.PERSON_citizenship

	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_education]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_education]
	@id nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM PERSON_education WHERE identifier = @id;

	SELECT input_type, filepath FROM dbo.FILES_documents_path
	WHERE identifier = @id
	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_family_members]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_family_members]
	@id nvarchar(20)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM PERSON_family_member WHERE identifier = @id
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_financial_solvency]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_financial_solvency]
	@id nvarchar(20),
	@eventIdentifier nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM PERSON_financial_solvency 
	WHERE identifier = @id
	AND event_identifier = @eventIdentifier

	SELECT input_type, filepath FROM dbo.FILES_documents_path
	WHERE identifier = @id
	AND event_identifier = @eventIdentifier

	
END
GO
/****** Object:  StoredProcedure [dbo].[PERSON_get_negative_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_get_negative_info]
	@id nvarchar(20),
	@eventIdentifier nvarchar(30)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM dbo.PERSON_negative 
	WHERE identifier = @id 
	AND event_identifier = @eventIdentifier

	SELECT input_type, filepath FROM dbo.FILES_documents_path
	WHERE identifier = @id
	AND event_identifier = @eventIdentifier
END
GO
/****** Object:  StoredProcedure [dbo].[PERSON_save_financial_documents_path]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_save_financial_documents_path]
	@identifier nvarchar(20),
	@eventIdentifier nvarchar(30),
	@inputType nvarchar(40),
	@filepath nvarchar(60)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.PERSON_financial_documents(identifier, input_type, filepath, event_identifier)
	VALUES (@identifier, @inputType, @filepath, @eventIdentifier)
	
END
GO
/****** Object:  StoredProcedure [dbo].[PERSON_save_negative_files_path]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_save_negative_files_path]
	@identifier nvarchar(20),
	@eventIdentifier nvarchar(30),
	@inputType nvarchar(40),
	@filepath nvarchar(60)
AS
BEGIN
	SET NOCOUNT ON;

	INSERT INTO dbo.PERSON_negative_info_files(identifier, input_type, filepath, event_identifier)
	VALUES (@identifier, @inputType, @filepath, @eventIdentifier)
	
END

GO
/****** Object:  StoredProcedure [dbo].[PERSON_update_career]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_update_career]
	@id int,
	@identifier nvarchar(20),
	@company_name nvarchar(400),
	@start_date datetime,
	@end_date datetime,
	@job_position nvarchar(400)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE dbo.PERSON_career
	SET
		company_name = @company_name, 
		start_date = @start_date,
		end_date = @end_date, 
		job_position = @job_position, 
		update_date = GETDATE()
	WHERE identifier = @identifier AND id = @id
	
END
GO
/****** Object:  StoredProcedure [dbo].[PERSON_update_education]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_update_education]
	@id int,
	@identifier nvarchar(20),
	@edu_type nvarchar(40),
	@edu_name nvarchar(600),
	@start_date datetime,
	@end_date datetime,
	@specialization nvarchar(600) = null,
	@qualification nvarchar(600) = null
AS
BEGIN
	SET NOCOUNT ON;


	UPDATE dbo.PERSON_education
	SET
		edu_institution_name = @edu_name, 
		start_date = @start_date, 
		end_date = @end_date, 
		specialization = @specialization, 
		qualification = @qualification, 
		update_date = GETDATE(), 
		education_type = @edu_type
	WHERE identifier = @identifier AND id = @id
	
END
GO
/****** Object:  StoredProcedure [dbo].[PERSON_update_family_member]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_update_family_member]
	@id int,
	@identifier nvarchar(20),
	@last_name nvarchar(30),
	@first_name nvarchar(30),
	@middle_name nvarchar(30),
	@birthdate datetime,
	@iin nvarchar(16),
	@work_place nvarchar(400),
	@family_status nvarchar(60)
AS
BEGIN
	SET NOCOUNT ON;


	UPDATE dbo.PERSON_family_member
	SET 
		last_name = @last_name, 
		first_name = @first_name, 
		middle_name = @middle_name, 
		birthdate = @birthdate, 
		iin = @iin, 
		work_place = @work_place, 
		family_status = @family_status, 
		update_date = GETDATE()
	WHERE identifier = @identifier AND id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[PERSON_update_financial_solvency]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_update_financial_solvency]
	@identifier nvarchar(20),
	@event_identifier nvarchar(30),
	@tax_debt nvarchar(800),
	@enforcement_proceedings nvarchar(800),
	@KZ_departure_ban nvarchar(800),
	@legal_entity nvarchar(800),
	--@criminal_liability_info nvarchar(800),
	--@administrative_responsibility_info nvarchar(800),
	@court_cases nvarchar(800),
	@negative_info nvarchar(800)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE PERSON_financial_solvency
	set tax_debt = @tax_debt,
	enforcement_proceedings = @enforcement_proceedings,
	KZ_departure_ban = @KZ_departure_ban,
	legal_entity = @legal_entity,
	--criminal_liability_info = @criminal_liability,
	--administrative_responsibility_info = @administrative_responsibility,
	court_cases = @court_cases,
	negative_info = @negative_info,
	update_date = GETDATE()
	WHERE identifier = @identifier
	AND event_identifier = @event_identifier
	
END
GO
/****** Object:  StoredProcedure [dbo].[PERSON_update_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_update_info]
	@identifier nvarchar(30),
	@last_name nvarchar(30),
	@first_name nvarchar(30),
	@middle_name nvarchar(30),
	@birthdate nvarchar(80),
	@birthplace nvarchar(80),
	@identification nvarchar(20),
	@iin nvarchar(16),
	@citizenship nvarchar(100),
	@family_status nvarchar(20),
	@phone_number nvarchar(20),
	@legal_address nvarchar(400),
	@actual_address nvarchar(400)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE dbo.PERSON_info
	SET last_name = @last_name,
	first_name = @first_name,
	middle_name = @middle_name,
	birthdate = @birthdate,
	identification = @identification,
	iin = @iin,
	citizenship = @citizenship,
	family_status = @family_status,
	phone_number = @phone_number,
	legal_address = @legal_address,
	actual_address = @actual_address
	where identifier = @identifier

END


GO
/****** Object:  StoredProcedure [dbo].[PERSON_update_negative_info]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[PERSON_update_negative_info]
	@identifier nvarchar(20),
	@event_identifier nvarchar(30),
	@erdr_info nvarchar(800),
	@criminal_offense nvarchar(800),
	@disengagement nvarchar(800),
	@administrative_responsibility nvarchar(800),
	@unreimbursed_damage nvarchar(800),
	@presense_of_family_ties nvarchar(800),
	@presence_of_disciplinary_action nvarchar(800),
	@suspension_from_work nvarchar(800),
	@termination_of_contract nvarchar(800),
	@criminal_record nvarchar(800),
	@criminal_remission nvarchar(800),
	@personal_sanctions nvarchar(800),
	@db_data_check nvarchar(800),
	@police_data_check nvarchar(800),
	@family_negative_info nvarchar(800)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE PERSON_negative
	set 
	erdr_info = @erdr_info,
	criminal_offense = @criminal_offense,
	disengagement = @disengagement,
	administrative_responsibility = @administrative_responsibility,
	unreimbursed_damage = @unreimbursed_damage,
	presense_of_family_ties = @presense_of_family_ties,
	presence_of_disciplinary_action = @presence_of_disciplinary_action,
	suspension_from_work = @suspension_from_work,
	termination_of_contract = @termination_of_contract,
	criminal_record = @criminal_record,
	criminal_remission = @criminal_remission,
	personal_sanctions = @personal_sanctions,
	db_data_check = @db_data_check,
	police_data_check = @police_data_check,
	family_negative_info = @family_negative_info
	WHERE identifier = @identifier
	AND event_identifier = @event_identifier
	
END
GO
/****** Object:  StoredProcedure [dbo].[VIOLATION_get_all]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[VIOLATION_get_all]

AS
BEGIN
	SET NOCOUNT ON;


	SELECT identifier
	FROM dbo.VIOLATION_common
	
END


GO
/****** Object:  StoredProcedure [dbo].[VIOLATION_get_by_id]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[VIOLATION_get_by_id]
	@id nvarchar(30) 
AS
BEGIN
	SET NOCOUNT ON;

	SELECT vc.*, vaf.*
	FROM  VIOLATION_common vc
	LEFT JOIN VIOLATION_additional_fields vaf
	ON vc.identifier = vaf.identifier
	WHERE vc.identifier = @id
	
END

GO
/****** Object:  StoredProcedure [dbo].[VIOLATION_get_categories]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[VIOLATION_get_categories]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT id as value, violation_category as label FROM VIOLATION_categories

END
GO
/****** Object:  StoredProcedure [dbo].[VIOLATION_get_kinds]    Script Date: 18.10.2024 15:20:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[VIOLATION_get_kinds]
	@id int
AS
BEGIN
	SET NOCOUNT ON;

	--SELECT id as value, violation_category as label FROM VIOLATION_categories

	SELECT id as value, violation_kind as label FROM VIOLATION_kinds WHERE category_id = @id

END
GO
USE [master]
GO
ALTER DATABASE [NEW_DVK] SET  READ_WRITE 
GO
