import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("board-modal", {
  state: () => ({
    showModal: false,
    advertisementId: 0,
    boards: [],
    newBoard: "",
    selectedBoard: null,
    isSubmitting: false,
    openDropdown: false,
    isNewBoardValid: true,
  }),
  actions: {
    async fetchBoards() {
      const { data } = await axios.get("/boards");
      this.boards = data.data;
    },
    toggleModal(advertisementId = 0) {
      this.advertisementId = advertisementId;
      this.showModal = !this.showModal;

      if (!this.showModal) {
        this.selectedBoard = null;
      }
    },
    toggleDropdown() {
      this.openDropdown = !this.openDropdown;
    },
    selectItem(board) {
      this.selectedBoard = board;
      this.toggleDropdown();
    },
    async saveAd() {
      this.isSubmitting = !this.isSubmitting;

      const { data } = await axios.post("/board/save-ad", {
        advertisement_id: this.advertisementId,
        ...(this.newBoard
          ? {
              other: this.newBoard,
            }
          : {
              board_id: this.selectedBoard.board_id,
            }),
      });

      // add new board to list
      if (this.newBoard) {
        this.newBoard = "";
        this.boards.unshift(data.board);
      }

      this.isSubmitting = !this.isSubmitting;

      return data;
    },
    async createNewBoard() {
      if (!this.newBoard) {
        this.isNewBoardValid = true;
        return;
      }

      this.selectedBoard = null;

      await this.saveAd();
    },
    async unsaveAd(board, advertisement) {
      try {
        this.isSubmitting = !this.isSubmitting;

        await axios.delete(`/board/${board}/advertisement/${advertisement}`);

        this.isSubmitting = !this.isSubmitting;
      } catch (error) {
        this.isSubmitting = !this.isSubmitting;
        console.error(error);
      }
    },
  },
});
