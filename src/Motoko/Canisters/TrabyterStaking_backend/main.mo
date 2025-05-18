shared ({ caller = _owner }) actor class StakingController()  {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };


};
