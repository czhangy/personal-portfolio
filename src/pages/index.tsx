// TS
import type { NextPage } from "next";
// Next
import Head from "next/head";
// Page components
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import HomePage from "@/components/HomePage/HomePage";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Charles Zhang&apos;s Portfolio</title>
            </Head>
            <PageWrapper>
                <HomePage />
            </PageWrapper>
        </div>
    );
};

export default Home;
