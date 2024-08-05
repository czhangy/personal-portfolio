import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import { PLACEHOLDER, SECTION_TYPES } from "@/static/constants";
import { QueriedHTMLElement, QueriedHTMLElements } from "@/static/types";

import NewPage from "./NewPage";

describe("NewPage", () => {
    /**
     * Renders the component
     */
    const renderNewPage = (): void => {
        render(<NewPage />);
    };

    /**
     * Adds a new section to the journal
     */
    const addNewSection = (): void => {
        let sectionOptions: HTMLButtonElement[] =
            screen.getAllByTestId("section-option");
        fireEvent.click(sectionOptions[0]);
    };

    describe("Rendering", () => {
        it("Renders correctly", () => {
            renderNewPage();

            // Check for title input
            const journalTitleInput: QueriedHTMLElement = screen.queryByTestId(
                "journal-title-input",
            );
            expect(journalTitleInput).toHaveAttribute(PLACEHOLDER, "Title");

            // Check for section menu
            const sectionMenu: QueriedHTMLElement =
                screen.queryByTestId("section-menu");
            const sectionOptions: QueriedHTMLElements =
                screen.queryAllByTestId("section-option");
            expect(sectionMenu).toBeInTheDocument();
            expect(sectionOptions).toHaveLength(
                Object.keys(SECTION_TYPES).length,
            );

            // Check for submit button
            const submitButton: QueriedHTMLElement =
                screen.queryByTestId("submit-button");
            expect(submitButton).toBeInTheDocument();
        });
    });

    describe("Sections", () => {
        it("Adds new sections correctly", () => {
            renderNewPage();

            // Add first new section
            addNewSection();

            // Check for new section
            let newSections: QueriedHTMLElements =
                screen.queryAllByTestId("new-section");
            expect(newSections).toHaveLength(1);

            // Check that selected section was deleted from options
            let sectionOptions = screen.getAllByTestId("section-option");
            const selectedOption: QueriedHTMLElement = screen.queryByText(
                Object.values(SECTION_TYPES)[0].displayName,
            );
            expect(sectionOptions).toHaveLength(
                Object.keys(SECTION_TYPES).length - 1,
            );
            expect(selectedOption).not.toBeInTheDocument();

            // Add second new section
            addNewSection();

            // Check second section is appended
            newSections = screen.queryAllByTestId("new-section");
            expect(newSections).toHaveLength(2);
        });
    });

    describe("Submitting", () => {
        /**
         * Sets the journal title to "Test Title"
         */
        const setJournalTitle = (): void => {
            const journalTitleInput: HTMLInputElement = screen.getByTestId(
                "journal-title-input",
            );
            fireEvent.change(journalTitleInput, {
                target: { value: "Test Title" },
            });
        };

        /**
         * Sets the first section title to "Test Section Title"
         */
        const setSectionTitle = (): void => {
            const sectionTitleInput: HTMLInputElement = screen.getByTestId(
                "section-title-input",
            );
            fireEvent.change(sectionTitleInput, {
                target: { value: "Test Section Title" },
            });
        };

        it("Can change the journal title", () => {
            renderNewPage();
            setJournalTitle();
        });

        it("Can change section titles", () => {
            renderNewPage();
            addNewSection();
            setSectionTitle();
        });

        it("Submits correctly", () => {
            renderNewPage();

            // Populate required fields
            setJournalTitle();
        });
    });
});
