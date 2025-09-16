shared ({ caller = _owner }) persistent actor class StakingController()  {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };


};
