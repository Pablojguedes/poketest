import { retrieve, save } from "../browser-storage.js";
import Pokemon from "./pokemon.js";

const MAX_TEAM_SIZE = 6;
const TEAM_KEY = "team-state";

export default class Team {
  members;

  constructor(members = []) {
    this.members = members;
  }

  static hasStored() {
    return retrieve(TEAM_KEY);
  }

  save() {
    save(TEAM_KEY, this.members);
  }

  load() {
    const rawMembers = retrieve(TEAM_KEY) || [];

    this.members = rawMembers.map((raw) => new Pokemon(raw));
  }

  addMember(pokemon) {
    this.members.push(pokemon);
  }

  removeMember(memberName) {
    this.members = this.members.filter(({ name }) => name !== memberName);
  }

  hasMember(memberName) {
    // return this.members.find(({ name }) => name === memberName);
    return this.members.some(({ name }) => name === memberName);
  }

  getMember(memberName) {
    if (this.hasMember(memberName))
      return this.members.find(({ name }) => name === memberName);
    return null;
  }

  isFull() {
    return this.members.length === MAX_TEAM_SIZE;
  }

  isEmpty() {
    return this.members.length === 0;
  }
}
