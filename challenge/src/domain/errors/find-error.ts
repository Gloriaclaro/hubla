class FindError extends Error {
  public readonly name: string = 'FindDataError';
  public readonly message: string = 'Fail to get fata from database';
}
export default FindError;
