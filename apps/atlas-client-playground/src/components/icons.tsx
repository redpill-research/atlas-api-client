import clsx from 'clsx';

export function CardIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('text-text-base-1', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 4.2C3.90132 4.2 2.2 5.90132 2.2 8V16C2.2 18.0987 3.90131 19.8 6 19.8H18C20.0987 19.8 21.8 18.0987 21.8 16V8C21.8 5.90132 20.0987 4.2 18 4.2H6ZM3.8 8C3.8 6.78497 4.78497 5.8 6 5.8H18C19.215 5.8 20.2 6.78497 20.2 8V9.2H3.8V8ZM3.8 10.8H20.2V16C20.2 17.215 19.215 18.2 18 18.2H6C4.78497 18.2 3.8 17.215 3.8 16V10.8ZM7 14.2C6.55817 14.2 6.2 14.5582 6.2 15C6.2 15.4418 6.55817 15.8 7 15.8H9C9.44182 15.8 9.8 15.4418 9.8 15C9.8 14.5582 9.44182 14.2 9 14.2H7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function NightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6001 7.20001V6.20001H13.6001V4.20001H14.6001V3.20001H16.6001V4.20001H17.6001V6.20001H16.6001V7.20001H14.6001ZM5.76197 19.7739C4.48605 15.6498 6.05506 11.3221 9.3577 8.90884L9.32981 8.99741C8.63091 11.2157 8.57648 13.663 9.31538 16.0513C10.9843 21.4456 16.1539 24.7913 21.5567 24.3648C20.57 25.2056 19.3999 25.864 18.0819 26.2718C12.8855 27.8795 7.36968 24.9703 5.76197 19.7739ZM11.165 6.43644C10.5198 5.96456 9.83331 6.25168 9.52993 6.40516C9.20105 6.57154 8.8101 6.84669 8.405 7.13179L8.34993 7.17055C4.26134 10.0467 2.29333 15.3293 3.85133 20.365C5.7855 26.6167 12.4214 30.1166 18.673 28.1825C21.26 27.3821 23.3778 25.7747 24.8324 23.7234C25.5287 22.7415 24.5013 21.6625 23.546 21.9581C18.3496 23.5658 12.8337 20.6566 11.226 15.4602C10.6111 13.4727 10.6567 11.4414 11.2374 9.59841L11.2569 9.53637C11.4336 8.97575 11.5947 8.46466 11.6667 8.06816C11.7043 7.86133 11.7357 7.59764 11.6939 7.32793C11.6471 7.02623 11.5005 6.68188 11.165 6.43644ZM20.4571 6.30397C20.6295 6.27354 20.806 6.27354 20.9784 6.30397C21.6751 6.4269 21.9773 7.0402 22.0928 7.28733C22.238 7.59817 22.3791 8.02146 22.531 8.4773L22.5488 8.53084C22.8422 9.41114 22.916 9.57427 23.0181 9.69045C23.0466 9.72294 23.0772 9.75354 23.1097 9.78207C23.2259 9.88408 23.389 9.9579 24.2693 10.2513L24.3228 10.2692L24.3229 10.2692L24.3229 10.2692L24.3229 10.2692C24.7787 10.4211 25.202 10.5621 25.5128 10.7073C25.7599 10.8228 26.3732 11.1251 26.4962 11.8217C26.5266 11.9941 26.5266 12.1706 26.4962 12.343C26.3732 13.0397 25.7599 13.3419 25.5128 13.4574C25.202 13.6026 24.7787 13.7437 24.3228 13.8956L24.2693 13.9134C23.389 14.2068 23.2259 14.2806 23.1097 14.3827C23.0772 14.4112 23.0466 14.4418 23.0181 14.4743C22.916 14.5905 22.8422 14.7536 22.5488 15.6339L22.531 15.6874L22.531 15.6875C22.3791 16.1433 22.238 16.5666 22.0928 16.8774C21.9773 17.1245 21.6751 17.7378 20.9784 17.8608C20.806 17.8912 20.6295 17.8912 20.4571 17.8608C19.7605 17.7378 19.4582 17.1245 19.3427 16.8774C19.1975 16.5666 19.0565 16.1433 18.9046 15.6874L18.8867 15.6339C18.5933 14.7536 18.5195 14.5905 18.4175 14.4743C18.3889 14.4418 18.3583 14.4112 18.3258 14.3827C18.2097 14.2806 18.0465 14.2068 17.1662 13.9134L17.1127 13.8956L17.1127 13.8956C16.6569 13.7437 16.2336 13.6026 15.9227 13.4574C15.6756 13.3419 15.0623 13.0397 14.9394 12.343C14.9089 12.1706 14.9089 11.9941 14.9394 11.8217C15.0623 11.1251 15.6756 10.8228 15.9227 10.7073C16.2336 10.5621 16.6569 10.4211 17.1127 10.2692L17.1662 10.2513C18.0465 9.9579 18.2097 9.88408 18.3258 9.78207C18.3583 9.75354 18.3889 9.72294 18.4175 9.69045C18.5195 9.57427 18.5933 9.41114 18.8867 8.53084L18.9046 8.4773L18.9046 8.47727C19.0565 8.02144 19.1975 7.59816 19.3427 7.28733C19.4582 7.0402 19.7605 6.4269 20.4571 6.30397ZM21.5152 11.0101C21.1242 10.5648 20.9293 10.0002 20.7178 9.36307C20.5062 10.0002 20.3113 10.5648 19.9203 11.0101C19.8348 11.1075 19.7429 11.1994 19.6455 11.2849C19.2002 11.6759 18.6356 11.8708 17.9985 12.0824C18.6356 12.2939 19.2002 12.4888 19.6455 12.8798C19.7429 12.9654 19.8348 13.0572 19.9203 13.1547C20.3113 13.5999 20.5062 14.1645 20.7178 14.8017C20.9293 14.1645 21.1242 13.5999 21.5152 13.1547C21.6008 13.0572 21.6926 12.9654 21.7901 12.8798C22.2353 12.4888 22.7999 12.2939 23.4371 12.0824C22.7999 11.8708 22.2353 11.6759 21.7901 11.2849C21.6926 11.1994 21.6008 11.1075 21.5152 11.0101ZM25.6001 19.2V20.2H27.6001V19.2H28.6001V17.2H27.6001V16.2H25.6001V17.2H24.6001V19.2H25.6001Z"
        fill="#121212"
      />
    </svg>
  );
}

export function DayIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0001 2.25C16.5524 2.25 17.0001 2.69772 17.0001 3.25V6.08333C17.0001 6.63562 16.5524 7.08333 16.0001 7.08333C15.4478 7.08333 15.0001 6.63562 15.0001 6.08333V3.25C15.0001 2.69772 15.4478 2.25 16.0001 2.25ZM16 19.6667C18.025 19.6667 19.6667 18.025 19.6667 16C19.6667 13.975 18.025 12.3333 16 12.3333C13.975 12.3333 12.3333 13.975 12.3333 16C12.3333 18.025 13.975 19.6667 16 19.6667ZM16 21.6667C19.1296 21.6667 21.6667 19.1296 21.6667 16C21.6667 12.8704 19.1296 10.3333 16 10.3333C12.8704 10.3333 10.3333 12.8704 10.3333 16C10.3333 19.1296 12.8704 21.6667 16 21.6667ZM17.0001 25.9167C17.0001 25.3644 16.5524 24.9167 16.0001 24.9167C15.4478 24.9167 15.0001 25.3644 15.0001 25.9167V28.75C15.0001 29.3023 15.4478 29.75 16.0001 29.75C16.5524 29.75 17.0001 29.3023 17.0001 28.75V25.9167ZM25.7228 6.27728C26.1133 6.66781 26.1133 7.30097 25.7228 7.6915L23.7193 9.69496C23.3288 10.0855 22.6957 10.0855 22.3051 9.69496C21.9146 9.30444 21.9146 8.67128 22.3051 8.28075L24.3086 6.27728C24.6991 5.88676 25.3323 5.88676 25.7228 6.27728ZM9.69498 23.7193C10.0855 23.3287 10.0855 22.6956 9.69498 22.305C9.30446 21.9145 8.67129 21.9145 8.28077 22.305L6.2773 24.3085C5.88677 24.699 5.88677 25.3322 6.2773 25.7227C6.66782 26.1132 7.30099 26.1132 7.69151 25.7227L9.69498 23.7193ZM29.7501 16C29.7501 16.5523 29.3024 17 28.7501 17H25.9167C25.3645 17 24.9167 16.5523 24.9167 16C24.9167 15.4477 25.3645 15 25.9167 15H28.7501C29.3024 15 29.7501 15.4477 29.7501 16ZM6.08333 17C6.63562 17 7.08333 16.5523 7.08333 16C7.08333 15.4477 6.63562 15 6.08333 15H3.25C2.69772 15 2.25 15.4477 2.25 16C2.25 16.5523 2.69771 17 3.25 17H6.08333ZM25.7228 25.7227C25.3323 26.1132 24.6991 26.1132 24.3086 25.7227L22.3051 23.7192C21.9146 23.3287 21.9146 22.6956 22.3051 22.305C22.6956 21.9145 23.3288 21.9145 23.7193 22.305L25.7228 24.3085C26.1133 24.699 26.1133 25.3322 25.7228 25.7227ZM8.28074 9.69496C8.67126 10.0855 9.30443 10.0855 9.69495 9.69496C10.0855 9.30444 10.0855 8.67127 9.69495 8.28075L7.69148 6.27728C7.30096 5.88675 6.66779 5.88675 6.27727 6.27728C5.88675 6.6678 5.88674 7.30097 6.27727 7.69149L8.28074 9.69496Z"
        fill="#F0F0EF"
      />
    </svg>
  );
}
