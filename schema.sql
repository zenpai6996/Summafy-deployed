create extension if not exists "uuid-ossp";

create table users (
                       id UUID primary key default uuid_generate_v4(),
                       email varchar(255) unique not null,
                       created_at timestamp with time zone default current_timestamp,
                       updated_at timestamp with time zone default current_timestamp,
                       full_name varchar(255),
                       customer_id varchar(255) unique,
                       price_id varchar(255),
                       status varchar(50) default 'inactive'
);

create table pdf_summaries(
                              id UUID primary key default uuid_generate_v4(),
                              user_id varchar(255) not null,
                              original_file_url text not null,
                              summary_text text not null,
                              status varchar(50) default 'completed',
                              title text,
                              file_name text,
                              created_at timestamp with time zone default current_timestamp,
                              updated_at timestamp with time zone default current_timestamp
);

create table payments(
                         id UUID primary key default uuid_generate_v4(),
                         amount integer not null,
                         status varchar(50) not null,
                         payment_id varchar(255) unique not null,
                         user_email varchar(255) not null references users(email),
                         created_at timestamp with time zone default current_timestamp,
                         updated_at timestamp with time zone default current_timestamp
);
CREATE TABLE razorpay_plans (
                                id VARCHAR(255) PRIMARY KEY, -- Razorpay plan ID
                                name VARCHAR(255) NOT NULL,
                                description TEXT,
                                pdf_limit INTEGER NOT NULL,
                                price DECIMAL(10,2) NOT NULL,
                                billing_cycle VARCHAR(50) NOT NULL, -- 'monthly' or 'yearly'
                                is_active BOOLEAN NOT NULL DEFAULT true,
                                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE razorpay_subscriptions (
                                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                        subscription_id VARCHAR(255) UNIQUE NOT NULL, -- Razorpay subscription ID
                                        user_id UUID REFERENCES users(id),
                                        plan_id VARCHAR(255) REFERENCES razorpay_plans(id),
                                        status VARCHAR(50) NOT NULL,
                                        current_start TIMESTAMP WITH TIME ZONE,
                                        current_end TIMESTAMP WITH TIME ZONE,
                                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE razorpay_webhook_events (
                                         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                         event_id VARCHAR(255) UNIQUE NOT NULL,
                                         event_type VARCHAR(255) NOT NULL,
                                         payload JSONB NOT NULL,
                                         processed BOOLEAN DEFAULT false,
                                         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

create or replace function update_updated_at_column()
returns trigger as $$
begin
NEW.updated_at=current_timestamp;
return NEW;
end;
$$ language 'plpgsql';

CREATE TRIGGER update_razorpay_plans_updated_at
    BEFORE UPDATE ON razorpay_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_razorpay_subscriptions_updated_at
    BEFORE UPDATE ON razorpay_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_razorpay_webhook_events_updated_at
    BEFORE UPDATE ON razorpay_webhook_events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

create trigger update_users_updated_at
    before update on users
    for each row
    execute function update_updated_at_column();

create trigger update_pdf_summaries_updated_at
    before update on pdf_summaries
    for each row
    execute function update_updated_at_column();

create trigger update_payments_updated_at
    before update on payments
    for each row
    execute function update_updated_at_column();