export function Footer() {
  return (
    <footer className="flex bg-PGFBrown justify-center items-center px-12">
      <div className="max-w-screen-2xl mx-auto flex justify-between w-full">
        <div className="flex items-center space-x-6">
          <a href="https://twitter.com/ethereum_mexico">
            <img src="/images/x-icon.png" className="h-10" alt="X Icon" />
          </a>
          <a href="https://t.me/wthmexico">
            <img src="/images/telegram-icon.png" className="h-10" alt="Telegram Icon" />
          </a>
        </div>
        <div className="flex items-center space-x-6 text-white">
        <h1 className="hidden sm:block">Una iniciativa de</h1>
          <img src="/images/ETHMx-icon.png" className="h-24 py-2 my-2" alt="ETHMx Icon" />
        </div>
      </div>
    </footer>
  );
}

