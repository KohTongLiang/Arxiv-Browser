import { SEARCH_PAPERS } from '../Constants/actiontype';

export function searchPapers (payload) {
    return { type: SEARCH_PAPERS, payload }
}