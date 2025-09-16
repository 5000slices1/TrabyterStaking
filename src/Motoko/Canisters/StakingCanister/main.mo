shared ({ caller = _owner }) persistent actor class StakingCanister() {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };


};
